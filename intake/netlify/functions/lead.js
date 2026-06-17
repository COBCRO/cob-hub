// netlify/functions/lead.js
// Recebe o envio do formulário de intake e cria uma task no pipeline do ClickUp.
// Cria a task com Serviço, Valor da Oportunidade e Próximo contato preenchidos,
// monta a descrição (insumo da skill proposta-cob) e anexa áudio + fotos.
//
// Variáveis de ambiente (Netlify → Site settings → Environment variables):
//   CLICKUP_TOKEN   -> seu token pessoal do ClickUp (começa com "pk_")
//   CLICKUP_LIST_ID -> 901325498955   (opcional; já vem como padrão abaixo)

const LIST_ID = process.env.CLICKUP_LIST_ID || "901325498955";
const TOKEN = process.env.CLICKUP_TOKEN;
const API = "https://api.clickup.com/api/v2";

// IDs reais da lista "Pipeline" (space CRM COMERCIAL)
const FIELD = {
  servico: "599c0637-00d8-45f3-a0b8-ec9c8ae53bf0", // dropdown
  valor:   "8f751f91-391f-4f93-a1c5-2b7720bc3dc5", // currency BRL
  proximo: "1a418ad0-8410-496e-9487-ec34e32d7354", // date
};
const SERVICO = {
  trafego: "3d24f334-eaaf-4dac-921d-589620af8af4",
  loja:    "f382335b-cd97-49f0-96de-053ffaf2d5c3",
};

// canal (como o cliente vende) -> Serviço que a COB vai entregar
function mapServico(canal = "") {
  if (/loja virtual|e-?commerce/i.test(canal)) return SERVICO.loja;
  return SERVICO.trafego; // padrão: a maioria chega por anúncio
}
// verba/mês -> Valor da Oportunidade (piso de fee da tabela COB por porte)
function mapValor(verba = "") {
  if (/até r\$ ?1\.500|1\.500 a r\$ ?3\.000/i.test(verba)) return 3000;       // Pequeno
  if (/3\.000 a r\$ ?8\.000|8\.000 a r\$ ?15\.000/i.test(verba)) return 4500; // Médio
  if (/acima de r\$ ?15\.000/i.test(verba)) return 6500;                       // Grande
  return null; // "ainda não sei" -> deixa em branco
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers: CORS, body: "Method Not Allowed" };
  if (!TOKEN) return { statusCode: 500, headers: CORS, body: "CLICKUP_TOKEN não configurado" };

  let data;
  try { data = JSON.parse(event.body || "{}"); }
  catch { return { statusCode: 400, headers: CORS, body: "JSON inválido" }; }

  const a = data.respostas || {};
  const nome = (data.nome || "").trim() || "Lead sem nome";

  // ----- descrição: o diagnóstico completo (insumo da proposta-cob) -----
  const linha = (rotulo, v) => (v ? `**${rotulo}:** ${v}\n` : "");
  const desc =
    `Lead recebido pelo formulário em ${new Date(data.enviado_em || Date.now()).toLocaleString("pt-BR")}.\n\n` +
    (a.oque ? `**O que faz / para quem**\n${a.oque}\n\n` : "") +
    linha("Como vende", a.canal) +
    linha("Já investe em anúncios", a.investe) +
    (a.diagnostico ? `**O que funcionou / travou**\n${a.diagnostico}\n` : (data.audio ? "**O que funcionou / travou:** _(áudio anexado)_\n" : "")) +
    linha("Verba por mês", a.verba) +
    linha("Ticket médio", a.ticket) +
    linha("Organiza contatos em", a.organiza) +
    linha("Marketing hoje", a.fornecedor) +
    linha("Objetivo (6 meses)", a.objetivo) +
    linha("Site / Instagram", a.presenca) +
    `\n---\n_Insumo pronto para a skill **proposta-cob**._`;

  // ----- campos do pipeline -----
  const custom_fields = [{ id: FIELD.servico, value: mapServico(a.canal) }];
  const valor = mapValor(a.verba);
  if (valor !== null) custom_fields.push({ id: FIELD.valor, value: valor });
  custom_fields.push({ id: FIELD.proximo, value: Date.now() });

  try {
    // 1) cria a task
    const r = await fetch(`${API}/list/${LIST_ID}/task`, {
      method: "POST",
      headers: { Authorization: TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify({ name: nome, markdown_content: desc, custom_fields }),
    });
    if (!r.ok) {
      const t = await r.text();
      return { statusCode: 502, headers: CORS, body: `Erro ao criar task: ${t}` };
    }
    const task = await r.json();

    // 2) anexa áudio e fotos (não derruba o lead se um anexo falhar)
    const anexos = [];
    if (data.audio?.dataUrl) anexos.push({ name: data.audio.name || "diagnostico.webm", dataUrl: data.audio.dataUrl });
    for (const f of (data.fotos || [])) if (f?.dataUrl) anexos.push({ name: f.name || "foto.jpg", dataUrl: f.dataUrl });

    for (const ax of anexos) {
      try {
        const [, b64] = ax.dataUrl.split(",");
        const buf = Buffer.from(b64, "base64");
        const fd = new FormData();
        fd.append("attachment", new Blob([buf]), ax.name);
        await fetch(`${API}/task/${task.id}/attachment`, {
          method: "POST",
          headers: { Authorization: TOKEN },
          body: fd,
        });
      } catch (e) { console.error("anexo falhou:", ax.name, e); }
    }

    return { statusCode: 200, headers: CORS, body: JSON.stringify({ ok: true, taskId: task.id, url: task.url }) };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, headers: CORS, body: "Erro interno" };
  }
};

# Design System COB — Marca Digital

> Fonte da verdade visual de tudo que a COB coloca na tela: formulário de intake, proposta, onboarding, dashboard, landing. Extraído do site no ar (não de um UI kit pronto). Mesma lógica do template-mestre: trava uma vez, todo mundo consulta, nada se reinventa por proposta.

---

## Princípio

A diferença da COB para os amadores do mercado não é ser mais séria *ou* mais alegre — é ter **craft**. Calor no tom, rigor na execução. **Consistência milimétrica entre as telas é a prova de que existe um time atrás** — é o que separa de freelancer com Canva. Posicionamento: **confiança calma** (estúdio sênior que respeita o tempo do cliente, não corporativo frio nem startup saltitante).

Não se adota Material, shadcn ou Chakra: eles são feitos para *não* ter identidade. O sistema da COB é próprio, pequeno e rigoroso. Os ossos estão abaixo.

---

## 1. Tokens — Cor

Base escura navy com azul elétrico. O brilho azul (não cor quente) é o que dá vida.

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#05070E` | Fundo (quase-preto navy) |
| `--card` | `#0C0E15` | Cards, inputs, superfícies |
| `--card-hover` | `#11141F` | Hover de superfície |
| `--line` | `#1B1F2C` | Bordas sutis |
| `--line-strong` | `#2A3142` | Bordas de input/foco |
| `--blue` | `#2D6BFF` | **Acento primário** — ação, links, botões, ponto do `CO-B.` |
| `--blue-bright` | `#4D86FF` | Hover do azul |
| `--blue-deep` | `#1E54E0` | Pressionado |
| `--green` | `#34D85A` | **Sucesso / conquista** — conclusão, ênfase "Performance" |
| `--text` | `#F4F6FB` | Texto principal (quase-branco) |
| `--text-soft` | `#9AA1B4` | Texto secundário |
| `--text-dim` | `#646A7D` | Placeholder, legendas |

**Glow:** radial de `rgba(45,107,255,.30)` no topo/canto, como o hero do site. Em UI pode respirar lento (9s); nunca pisca.

**Gradiente:** só em **dois** lugares — barra de progresso e botão primário. Em mais lugares vira AI-genérico.

### Regra do vermelho
O site usa vermelho (`~#FF2D2D`) como **ênfase de copy** ("concorrência"). **Nunca em UI funcional** — em formulário e produto, vermelho lê como erro. Mantê-lo exclusivo de headline/copy.

### Regra do verde
Verde é **conquista**, não decoração. Reservado para estado concluído, badge de sucesso e a recompensa do fim de fluxo. Estado *selecionado* usa azul (ação), não verde.

---

## 2. Tokens — Tipografia

**Inter Tight** para tudo. Uma família só; o **peso** carrega a hierarquia (é o que o site faz).

| Papel | Peso | Tratamento |
|---|---|---|
| Display / headline | 800 | `letter-spacing:-.03em a -.045em`, line-height 1.0–1.1 |
| Título de seção | 700 | tracking levemente negativo |
| Corpo / UI | 400–500 | line-height 1.5 |
| Eyebrow / label | 600 | `text-transform:uppercase`, `letter-spacing:.06em` |
| Números / métricas | 800 | `font-variant-numeric:tabular-nums` |

Sem segunda família. A consistência da Inter Tight é parte da assinatura.

---

## 3. Tokens — Forma e espaço

- **Raio:** 16px superfícies grandes, 12–14px inputs/botões, 7–8px pills pequenas, 99px pills/track.
- **Borda:** 1.5px (`--line` / `--line-strong`).
- **Sombra:** quase nenhuma no escuro; profundidade vem de borda + leve glow colorido nos elementos de ação (`0 6px 20px rgba(45,107,255,.28)` no botão).
- **Container de leitura:** máx ~660px.

---

## 4. Tokens — Movimento

Marca grande se move **menos e com mais peso**. Mola saltitante = júnior. Suave e direcional = casa estabelecida.

- **Easing padrão:** `cubic-bezier(.32,.72,.3,1)` — sem overshoot.
- **Duração:** 200–550ms. Entrada de tela ~420ms, saída ~240ms.
- **Direcional:** avançar entra de baixo, voltar entra de cima. O cérebro sente o progresso.
- **Um momento herói só:** a recompensa no fim (check verde que desenha + glow). O resto, quieto.
- **`prefers-reduced-motion`:** desliga todas as animações. Obrigatório.

---

## 5. Componentes

| Componente | Spec |
|---|---|
| **Marca** | `CO-B` peso 800 + ponto azul `.` — sempre presente no topo |
| **Botão primário** | fundo `--blue`, texto branco, raio 13px, glow azul; hover `--blue-bright` + translateY(-1px) |
| **Botão conquista** | fundo `--green`, texto escuro — só em "enviar/concluir" |
| **Card** | `--card` + borda `--line`, raio 16px; hover sobe para `--card-hover` |
| **Pill / badge** | fundo `--blue-soft`, borda azul translúcida, texto `--blue-bright`; variante verde para sucesso |
| **Chip de métrica** | escuro com borda, número em peso 800 tabular (ex.: "ROAS 23x", "8 meses") |
| **Input** | `--card` + borda `--line-strong`; foco = borda azul + halo `rgba(45,107,255,.14)` |
| **Opção (escolha)** | card com letra-chave; selecionado = borda azul + fill azul-suave + check |
| **Barra de progresso** | track `--line`, fill gradiente azul; vira verde ao concluir |

---

## 6. Padrões de interação

- **Padrão Typeform (uma pergunta por tela), não a ferramenta Typeform.** O SaaS carimba marca dele, limita o visual e não conecta no pipeline (áudio→Plaud, link/fotos→`asset_ids`, respostas→skill). O padrão a gente usa; a ferramenta, não — no máximo como rascunho descartável.
- **Progresso com head-start:** a barra abre em ~10%, nunca em zero (quem começa "andando" termina mais).
- **Auto-avanço** nas escolhas únicas + check imediato (recompensa).
- **Prova na entrada e na saída:** 14+ anos · 300+ empresas + nomes (Samsung, Grendene, Beauty'in, Hard Rock, Melissa, Cyrela). Autoridade é evidência, não adjetivo.
- **Foto real do cliente > stock/IA** sempre — alimenta `asset_ids` no deck e tira a cara genérica.

---

## 7. Regras invioláveis

1. **Sem emoji em UI.** Ícone é traço (SVG), não emoji. Emoji sussurra "freelancer".
2. **Azul = ação, verde = conquista, vermelho = só ênfase de copy (nunca UI).**
3. **Gradiente só na barra e no botão.**
4. **Inter Tight, peso faz a hierarquia.** Sem segunda fonte.
5. **Movimento pesado, suave, direcional, com um único momento herói.** `reduced-motion` respeitado.
6. **Prova visível** na primeira e na última tela.
7. **Tom:** caloroso e adulto. Sem "bora", sem "tá voando", sem guru. Confiante, não júnior.
8. **Consistência > novidade.** Tela nova nasce destes tokens; não se reinventa estilo por projeto.

---

## 8. Onde aplica

Formulário de intake (`cob-intake.html`) · proposta (deck) · onboarding · dashboard de cliente · landing. Stack: HTML+CSS (variáveis = tokens) + JS para uma tela; React + Tailwind com os mesmos tokens quando virar família de telas reaproveitáveis.

> Atualizou a marca (cor, fonte, glow)? Edite **aqui e no site** — esta é a fonte. As telas herdam; nunca o contrário.

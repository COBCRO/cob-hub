# COB Intake

Formulário de captura de leads da COB. Lead → ClickUp pipeline CRM Comercial.

## Estrutura

```
intake/
├── public/
│   └── index.html              # form (10 perguntas, áudio, fotos)
├── netlify/
│   └── functions/
│       └── lead.js             # recebe envio e cria task no ClickUp
└── netlify.toml                # publish=public, functions=netlify/functions
```

## Deploy (3 passos)

1. **Netlify** — criar novo site apontando para este diretório.
   - Site settings → Build & deploy → Base directory: `intake/`

2. **Variável de ambiente** — em Site settings → Environment variables:
   - `CLICKUP_TOKEN` = seu token pessoal do ClickUp (começa com `pk_`)
   - `CLICKUP_LIST_ID` já está fixo em `901325498955` no código (opcional sobrescrever)

3. **Sair do modo DEMO** — em `public/index.html`, trocar:
   ```js
   const DEMO = true;   // <- atual
   const DEMO = false;  // <- produção
   ```
   Com `DEMO=true` o envio é só logado no console — útil pra testar UX sem a função no ar.

## Como cada resposta cai no ClickUp

- **Nome** → título da task
- **Canal** (resposta Q2) → campo **Serviço**
  - e-commerce → "Loja Virtual"
  - resto → "Trafego"
- **Verba** (Q5) → campo **Valor da Oportunidade** (piso de fee por porte)
  - até R$ 3k → R$ 3.000
  - R$ 3–15k → R$ 4.500
  - acima → R$ 6.500
- **Data do envio** → campo **Próximo contato**
- **Diagnóstico completo** (o que faz, dor, ticket, organização, fornecedor, objetivo, presença) → descrição em markdown
- **Áudio + fotos** → anexos da task

## IDs do workspace

- Workspace: `90132645167`
- Lista pipeline: `901325498955`
- Campos:
  - Serviço (dropdown): `599c0637-00d8-45f3-a0b8-ec9c8ae53bf0`
  - Valor da Oportunidade (currency): `8f751f91-391f-4f93-a1c5-2b7720bc3dc5`
  - Próximo contato (date): `1a418ad0-8410-496e-9487-ec34e32d7354`

## Limites

- Netlify Functions: requisições até ~6MB. Fotos já são reduzidas pra max 1600px no browser antes de enviar — caso normal cabe. Áudio de 1–2 min passa tranquilo.
- Token nunca trafega no browser — fica só na env var da função.

## Próximo passo (futuro)

Task nova criada disparar a skill `proposta-cob` automaticamente (puxando o áudio transcrito) — proposta sai quase pronta antes de abrir o ClickUp.

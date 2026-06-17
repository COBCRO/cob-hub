export type ResourceKind = "site" | "tool" | "material";

export type Resource = {
  id: string;
  kind: ResourceKind;
  title: string;
  description: string;
  url: string;
  tags: string[];
  owner?: string;
  internal?: boolean;
};

export const RESOURCES: Resource[] = [
  {
    id: "site-institucional",
    kind: "site",
    title: "Site institucional COB",
    description: "Site principal da COB — vitrine externa (colombo-b.com).",
    url: "https://colombo-b.com",
    tags: ["institucional", "externo"],
  },
  {
    id: "site-intake",
    kind: "site",
    title: "Form de captura de leads",
    description:
      "Formulário público que gera task no pipeline CRM Comercial do ClickUp. Código em /intake.",
    url: "https://example.netlify.app",
    tags: ["lead", "captura", "intake"],
    owner: "Comercial",
  },
  {
    id: "tool-clickup-pipeline",
    kind: "tool",
    title: "Pipeline CRM Comercial (ClickUp)",
    description:
      "Lista do ClickUp onde os leads do form caem como tasks com Serviço, Valor e Próximo contato.",
    url: "https://app.clickup.com/90132645167/v/li/901325498955",
    tags: ["clickup", "crm", "pipeline"],
    owner: "Comercial",
    internal: true,
  },
  {
    id: "material-design-system",
    kind: "material",
    title: "Design System COB",
    description:
      "Fonte da verdade visual — tokens, cores (navy + azul elétrico), tipografia Inter Tight. Em /docs/Design_System_COB.md.",
    url: "https://github.com/cob/cob-hub/blob/main/docs/Design_System_COB.md",
    tags: ["marca", "tokens", "design"],
  },
];

export const KIND_LABEL: Record<ResourceKind, string> = {
  site: "Sites",
  tool: "Ferramentas",
  material: "Materiais",
};

export const KIND_DESCRIPTION: Record<ResourceKind, string> = {
  site: "Sites institucionais, portais e domínios da COB.",
  tool: "Ferramentas internas usadas pelos times no dia a dia.",
  material: "Brand assets, templates e arquivos compartilhados.",
};

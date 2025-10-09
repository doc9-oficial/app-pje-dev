import docgo from "docgo-sdk";

interface ConsultaProcessoParams {
  numeroProcesso: string;
  tribunal?: string;
}

async function consultarProcesso(params: ConsultaProcessoParams): Promise<void> {
  try {
    // Normalizar parâmetros se for array
    if (Array.isArray(params) && params.length === 1 && typeof params[0] === 'object') {
      params = params[0];
    }

    // Validação de entrada
    if (!params.numeroProcesso) {
      console.log(docgo.result(false, null, "É necessário informar o número do processo"));
      return;
    }

    // Obter credenciais via com o app-whom passando token e extension-id
    if (!docgo.getEnv("whomToken") || !docgo.getEnv("whomExtensionId")) {
      console.log(docgo.result(false, null, "Credenciais do Whom não configuradas"));
      return;
    }

    // obter sessao do whom
    const session = true;
    if (!session) {
      console.log(docgo.result(false, null, "Não foi possível obter sessão do Whom"));
      return;
    }
  
    // Simular tempo de resposta do PJe
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simular dados retornados do PJe
    const dadosProcesso = {
      numeroProcesso: params.numeroProcesso,
      tribunal: params.tribunal || "TRT",
      instancia: "1º Grau",
      vara: "2ª Vara do Trabalho",
      comarca: "São Paulo",
      dataDistribuicao: "2025-01-15",
      classePJe: "AÇÃO TRABALHISTA - RITO ORDINÁRIO (985)",
      numeroCNJ: params.numeroProcesso,
      partes: [
        { tipo: "Reclamante", nome: "João da Silva", advogados: ["Dr. Carlos Mendes - OAB/SP 12345"] },
        { tipo: "Reclamado", nome: "Empresa XYZ Ltda.", advogados: ["Dra. Ana Oliveira - OAB/SP 54321"] }
      ],
      movimentacoes: [
        { 
          data: "2025-09-30", 
          descricao: "Conclusos para decisão",
          usuario: "SISTEMA PJe"
        },
        { 
          data: "2025-09-15", 
          descricao: "Juntada de Petição de Contestação",
          usuario: "Advogado"
        },
        { 
          data: "2025-08-20", 
          descricao: "Audiência de conciliação designada para 15/10/2025",
          usuario: "Juiz do Trabalho"
        },
        { 
          data: "2025-07-10", 
          descricao: "Reclamado citado eletronicamente",
          usuario: "SISTEMA PJe"
        },
        { 
          data: "2025-06-05", 
          descricao: "Distribuído por sorteio",
          usuario: "SISTEMA PJe"
        }
      ],
      valorCausa: "R$ 50.000,00",
      assuntos: ["Rescisão do Contrato de Trabalho", "Verbas Rescisórias", "Horas Extras"],
      juiz: "Dr. Roberto Santos",
      prazosAbertos: [
        {
          descricao: "Prazo para Contestação",
          inicio: "2025-07-11",
          fim: "2025-07-25",
          dias: "15 dias úteis"
        }
      ]
    };

    // Retornar resposta
    console.log(docgo.result(true, dadosProcesso));
  } catch (err: any) {
    console.log(docgo.result(false, null, err.message));
  }
}

export default consultarProcesso;

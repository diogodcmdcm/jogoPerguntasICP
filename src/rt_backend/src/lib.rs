

// Array de 4 itens de texto (strings literais)
const PERGUNTAS: [&str; 10] = ["Qual é a capital da França?", 
                            "Qual é o maior planeta do Sistema Solar?", 
                            "Quem escreveu Dom Casmurro?", 
                            "Qual é o elemento químico com o símbolo O?",
                            "Em que ano o homem pisou na Lua pela primeira vez?",
                            "Qual é o continente mais populoso do mundo?",
                            "Qual é o maior órgão do corpo humano?",
                            "Qual é a moeda oficial do Japão?",
                            "Quem pintou A Última Ceia?",
                            "Qual é a fórmula química da água?"];                                                                     
                           
const OPCOES: [&str; 10] = ["Londres;Paris;Berlim;Roma", 
                            "Terra;Marte;Júpiter;Saturno", 
                            "Machado de Assis;José de Alencar;Jorge Amado;Clarice Lispector", 
                            "Ouro;Oxigênio;Ósmio;Oxido", 
                            "1965;1969;1971;1975",
                            "América;Europa;Ásia;África",
                            "Coração;Pulmão;Pele;Fígado",
                            "Yuan;Won;Iene;Dólar",
                            "Michelangelo;Leonardo da Vinci;Rafael;Van Gogh",
                            "H2O;CO2;O2;H2O2"];

const RESPOSTAS: [u64; 10] = [2, 3, 1, 2, 2, 3, 3, 3, 2, 1];

#[ic_cdk::query]
fn get_pergunta(index: u64) -> String {
    format!("{}", PERGUNTAS[index as usize])  

}

#[ic_cdk::query]
fn get_respostas(index: u64) -> String {

    format!("{}", OPCOES[index as usize])  

}

#[ic_cdk::query]
fn validar_resposta(index: u64, res: u64) -> String {
    
    let mut ponto: u64 = 0;
    if RESPOSTAS[index as usize] == res {            
        ponto = 100;            
    }

    format!("{}", ponto)
}


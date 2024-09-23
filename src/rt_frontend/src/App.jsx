import { useState, useEffect } from 'react';
import { rt_backend } from 'declarations/rt_backend';

function App() {
  const [pergunta, setPergunta] = useState('');
  const [indexPergunta, setIndexPergunta] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  const [opcao1, setOpcao1] = useState('');
  const [opcao2, setOpcao2] = useState('');
  const [opcao3, setOpcao3] = useState('');
  const [opcao4, setOpcao4] = useState('');

  const [selectedOption, setSelectedOption] = useState(1);

  useEffect(() => {
    rt_backend.get_pergunta(0).then((perg) => {
      setPergunta(perg);
    });

    rt_backend.get_respostas(BigInt(0)).then((resp) => {        
      const arrayRespostas = resp.split(';');
      setOpcao1(arrayRespostas[0]);
      setOpcao2(arrayRespostas[1]);        
      setOpcao3(arrayRespostas[2]);
      setOpcao4(arrayRespostas[3]);
    });

  }, []); // 

  async function proximaPergunta(){
    
    let p = await rt_backend.validar_resposta(BigInt(indexPergunta), BigInt(selectedOption));
    setPontos(pontos+Number(p));      
     
     let i = indexPergunta+1;      

     if(i<=9){
        setIndexPergunta(i);         
        rt_backend.get_pergunta(BigInt(i)).then((perg) => { setPergunta(perg); });

        rt_backend.get_respostas(BigInt(i)).then((resp) => {        
          const arrayRespostas = resp.split(';');
          setOpcao1(arrayRespostas[0]);
          setOpcao2(arrayRespostas[1]);        
          setOpcao3(arrayRespostas[2]);
          setOpcao4(arrayRespostas[3]);
        });      
     } else {  
      setJogoFinalizado(true);
     }

  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <main>

      {jogoFinalizado && <div><h2>Jogo Finalizado!</h2> <label>Sua pontuação foi de {pontos}</label>
          <br /><br /><button style={{ fontSize: '20px', padding: '10px 20px' }} >Jogar Novamente</button>
        </div> } 

      {!jogoFinalizado && <div style={{margin: '20px' }} >
          <h2>Jogo do milhão</h2>      
          <label>Responda as perguntas abaixo:</label>          
          <p style={{color: 'blue'}} ><h2>{pergunta}</h2></p>
          <div>
              <b><label htmlFor="pergunta" >Escolha a sua resposta:</label></b>
              <br />
              <br />
              <div>
                <input
                  type="radio"
                  name="options"
                  value="1"
                  checked={selectedOption === '1'}
                  onChange={handleOptionChange}
                />
                <label>{opcao1}</label>
              </div>

              <div>
                <input
                  type="radio"
                  name="options"
                  value="2"
                  checked={selectedOption === '2'}
                  onChange={handleOptionChange}
                />
                <label>{opcao2}</label>
              </div>

            <div>
              <input
                type="radio"
                name="options"
                value="3"
                checked={selectedOption === '3'}
                onChange={handleOptionChange}
              />
              <label>{opcao3}</label>
            </div>

            <div>
              <input
                type="radio"
                name="options"
                value="4"
                checked={selectedOption === '4'}
                onChange={handleOptionChange}
              />
              <label>{opcao4}</label>
            </div>
            <br />
            <button onClick={ ()=> {proximaPergunta()}} style={{ fontSize: '20px', padding: '10px 20px' }} >Enviar Resposta</button>
         
          </div>
      </div> }
      
    </main>
  );
}

export default App;

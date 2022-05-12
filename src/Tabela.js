import axios from "axios";
import {useEffect, useState} from "react";

function Tabela(){

    const [usuarios, setUsuarios] = useState([]);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function salvarFormulario(){

        let parametros = {
            name: nome,
            email: email,
            password: senha
        }

        axios.post('https://iot.14mob.com/api-fiap/public/index.php/users', parametros).then(response => {
            if(response.status == 201){
                alert('Deu certo');
            }
            else{
                alert('Deu errado');
            }
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get("https://iot.14mob.com/api-fiap/public/index.php/users").then(response => {
            setUsuarios(response.data.users);
            console.log(response);
        })
    },[])

    return(
        <div>
            <form className='formulario' onSubmit={e => {
                e.preventDefault();
                salvarFormulario();
                return false;
            }}>

                <div className="nome">
                    <label>Nome:</label>
                    <input name='name' onChange={e => setNome(e.target.value)}/>
                </div>

                <div className="email">
                    <label>E-mail:</label>
                    <input name='email' onChange={e => setEmail(e.target.value)}/>
                </div>

                <div className='senha'>
                    <label>Senha:</label>
                    <input name='password' onChange={e => setSenha(e.target.value)}/>
                </div>

                <button type='submit' className='botao'>Enviar</button>

            </form>

            <p>{nome}</p>
            <p>{email}</p>
            <p>{senha}</p>

            <table className="minhaTabela">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody className='body'>
                    { usuarios.map( usuario => {
                    return <tr key={usuario.id} >
                            <td>{usuario.id}</td>
                            <td>{usuario.name}</td>
                            <td>{usuario.email}</td>
                        </tr>
                    }   )   }
                </tbody>

            </table>
        </div>
    );
}

export default Tabela;
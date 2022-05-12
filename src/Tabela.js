import axios from "axios";
import {useEffect, useState} from "react";

function Tabela(){

    const [usuarios, setUsuarios] = useState([]);

    const [id,setId] = useState("");
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

    function removerUsuario(id) {
        axios.delete("https://iot.14mob.com/api-fiap/public/index.php/users/" + id).then(response => {
            alert('Deu certo, removi o usuário!')
            window.location = '';
        }).catch(error => console.log(error));
    }

    function atualizarUsuarioApi() {

        let parametros = {
            name: nome,
            email: email,
            password: senha
        }

        axios.put('https://iot.14mob.com/api-fiap/public/index.php/users/' + id, parametros).then(response => {
            if(response.status == 200){
                alert('Deu certo');
            }
            else{
                alert('Deu errado');
            }
        }).catch(error => console.log(error));
    }

    function atualizarUsuario(usuario) {
        setId(usuario.id);
        setNome(usuario.name);
        setEmail(usuario.email);
        setSenha(usuario.password);
    }

    useEffect(() => {
        axios.get("https://iot.14mob.com/api-fiap/public/index.php/users").then(response => {
            setUsuarios(response.data.users);
            console.log(response);
        })
    },[])

    return(
        <div className="container">
            <form className='formulario' onSubmit={e => {
                e.preventDefault();
                if(id != ''){
                    atualizarUsuarioApi()
                }else{
                    salvarFormulario();
                }
                return false;
            }}>

                <div className="nome">
                    <label>Nome:</label>
                    <input name='name' value={nome} onChange={e => setNome(e.target.value)} className='input'/>
                </div>

                <div className="email">
                    <label>E-mail:</label>
                    <input name='email' value={email} onChange={e => setEmail(e.target.value)} className='input'/>
                </div>

                <div className='senha'>
                    <label>Senha:</label>
                    <input name='password' value={senha} onChange={e => setSenha(e.target.value)} className='input'/>
                </div>

                <button type='submit' className='botao'>Enviar</button>

            </form>

            <table className="minhaTabela">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody className='body'>
                    { usuarios.map( usuario => {
                    return <tr key={usuario.id} >
                            <td>{usuario.id}</td>
                            <td>{usuario.name}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button onClick={e => removerUsuario(usuario.id)}>Deletar</button>
                                <button onClick={e => atualizarUsuario(usuario)}>Editar</button>
                            </td>
                        </tr>
                    }   )   }
                </tbody>

            </table>
        </div>
    );
}

export default Tabela;
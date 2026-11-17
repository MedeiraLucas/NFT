import {useState,type FormEvent} from 'react';
import {Link,useNavigate} from '@tanstack/react-router';
import {useLogin,useSignup} from '../features/auth/hooks';
import {Eye,EyeOff,X} from 'lucide-react';

export function Auth({mode}:{mode:'login'|'signup'}){
  const nav=useNavigate();const login=useLogin();const signup=useSignup();
  const [error,setError]=useState('');const [showPassword,setShowPassword]=useState(false);
  const [password,setPassword]=useState('');const [confirm,setConfirm]=useState('');
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setError('');
    if(mode==='signup'&&password!==confirm){setError('As senhas não coincidem.');return}
    const d=new FormData(e.currentTarget);
    try{
      if(mode==='login')await login.mutateAsync({email:String(d.get('email')),password:String(d.get('password'))});
      else await signup.mutateAsync({name:String(d.get('name')),email:String(d.get('email')),password:String(d.get('password'))});
      await nav({to:'/market'});
    }catch{setError('Não foi possível autenticar. Verifique os dados e tente novamente.')}
  }
  return <main className="auth-scene">
    <div className="auth-scene-art" aria-hidden="true"><img src="/images/emerald.webp" alt=""/><div><span>EXPLORE O EXTRAORDINÁRIO</span><h1>ARTE DIGITAL.<br/>NOVAS POSSIBILIDADES.</h1><p>Descubra coleções únicas no universo dos NFTs.</p></div></div>
    <div className="auth-overlay" onClick={()=>nav({to:'/'})}/>
    <section className="auth-dialog" role="dialog" aria-modal="true" aria-label={mode==='login'?'Entrar':'Criar conta'}>
      <Link className="auth-close" to="/" aria-label="Fechar"><X size={19}/></Link>
      <div className="auth-mobile-brand">KURIO</div>
      <div className="auth-tabs"><Link to="/login" className={mode==='login'?'active':''}>Entrar</Link><span/><Link to="/signup" className={mode==='signup'?'active':''}>Criar conta</Link></div>
      <p className="auth-description">{mode==='login'?'Entre para gerenciar sua carteira, coleção e perfil de criador.':'Crie seu perfil de colecionador e conecte uma carteira quando quiser.'}</p>
      <form className="auth-form" onSubmit={submit}>
        {mode==='signup'&&<label><span className="sr-only">Nome de usuário</span><input name="name" placeholder="Nome de usuário" autoComplete="username" required minLength={2}/></label>}
        <label><span className="sr-only">E-mail</span><input name="email" placeholder={mode==='login'?'contato@email.com':'Digite seu e-mail'} type="email" autoComplete="email" required/></label>
        <label className="password-field"><span className="sr-only">Senha</span><input name="password" placeholder="Senha" type={showPassword?'text':'password'} autoComplete={mode==='login'?'current-password':'new-password'} required minLength={8} value={password} onChange={e=>setPassword(e.target.value)}/><button type="button" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword?'Ocultar senha':'Mostrar senha'}>{showPassword?<EyeOff size={18}/>:<Eye size={18}/>}</button></label>
        {mode==='signup'&&<label><span className="sr-only">Confirmar senha</span><input type={showPassword?'text':'password'} placeholder="Confirmar senha" autoComplete="new-password" required minLength={8} value={confirm} onChange={e=>setConfirm(e.target.value)}/></label>}
        {mode==='login'&&<p className="auth-forgot">Recuperação de senha indisponível na demonstração</p>}
        {error&&<p className="auth-error" role="alert">{error}</p>}
        <button className="btn auth-submit" disabled={login.isPending||signup.isPending}>{login.isPending||signup.isPending?'Aguarde...':mode==='login'?'Entrar':'Criar conta'}</button>
      </form>
      <div className="auth-divider"><span/>Ou continue com<span/></div>
      <div className="auth-social"><button type="button" disabled title="Integração externa não disponível">Continuar com Google</button><button type="button" disabled title="Integração externa não disponível">Continuar com Facebook</button></div>
      <p className="auth-switch">{mode==='login'?<>Novo na Kurio? <Link to="/signup">Crie uma conta</Link></>:<>Já tem uma conta? <Link to="/login">Entre</Link></>}</p>
    </section>
  </main>
}

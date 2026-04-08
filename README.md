# Painel Administrativo - Parra Empreendimentos

Painel administrativo para gerenciamento do blog do site Parra Empreendimentos.

## 🌐 **Como Ativar no GitHub Pages**

### Passo 1: Acesse o Repositório
Vá para: **https://github.com/vitorbsalvajoli/Para-Empreendimentos-admin**

### Passo 2: Ativar GitHub Pages
1. Clique em **Settings** (no topo do repositório)
2. No menu lateral esquerdo, clique em **Pages**
3. Em **Build and deployment**:
   - Em **Source**, selecione: **Deploy from a branch**
   - Em **Branch**, selecione: **main** 
   - Em **Folder**, deixe: **/(root)**
4. Clique em **Save**

### Passo 3: Aguardar
Em 1-2 minutos, o GitHub Pages será ativado e o painel estará disponível em:
**https://vitorbsalvajoli.github.io/Para-Empreendimentos-admin/admin.html**

---

## 🎨 **Como Usar o Painel**

### Acesso
- **URL**: `https://vitorbsalvajoli.github.io/Para-Empreendimentos-admin/admin.html`
- **Usuário**: `admin`
- **Senha**: `admin123`

### Funcionalidades
- ✅ Criar novos posts para o blog
- ✅ Editar posts existentes
- ✅ Excluir posts
- ✅ Gerenciar categorias
- ✅ Editor visual (WYSIWYG)

---

## 📁 **Arquivos do Painel**

```
Para-Empreendimentos-admin/
├── admin.html      # Página principal do painel
├── admin.css       # Estilos do painel
├── admin.js        # JavaScript do painel
└── style.css       # Estilos compartilhados
```

---

## 🔄 **Como Atualizar**

Sempre que fizer alterações nos arquivos do admin:

```bash
cd parra-admin
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

O GitHub Pages atualizará automaticamente em alguns minutos.

---

## ⚠️ **Importante**

1. **Blog usa localStorage**: Os posts são salvos no navegador de quem usa o painel. Para um blog profissional com acesso de múltiplos usuários, considere usar WordPress ou similar.

2. **Segurança**: Este é um painel simples. Para produção, considere implementar autenticação mais robusta.

3. **Integração**: Para integrar com o site principal, atualize o link no rodapé do blog para:
   ```html
   <a href="https://vitorbsalvajoli.github.io/Para-Empreendimentos-admin/admin.html">Área Administrativa</a>
   ```

---

## 📧 **Suporte**

Para dúvidas, consulte o README do repositório principal:
https://github.com/vitorbsalvajoli/Parra-emprendimentos

---

**Desenvolvido com ❤️ para Parra Empreendimentos**
# 🧵 FioGestor - Seu ateliê em modo automático

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fseu-usuario%2Ffiogestor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> Sistema de gestão completo para costureiras autônomas. WhatsApp automático, agenda inteligente e controle financeiro em um só lugar.

## ✨ Funcionalidades

### 📱 WhatsApp Automático
- Templates personalizáveis para cada situação
- Mensagens prontas com variáveis dinâmicas
- Lembretes automáticos de consultas
- Histórico completo de conversas

### 📅 Agenda Inteligente
- Visualização mensal e semanal
- Evita conflitos de horário
- Notificações automáticas
- Sincronização com WhatsApp

### 💰 Controle Financeiro
- Acompanhamento de receitas e despesas
- Relatórios mensais automáticos
- Controle de pagamentos
- Análise de lucratividade

### 👥 Gestão de Clientes
- Cadastro completo com medidas
- Histórico de atendimentos
- Fotos de referência
- Status de projetos

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **Forms**: React Hook Form + Zod
- **Payments**: Stripe
- **State**: React Query + Context API
- **Icons**: Lucide React
- **Charts**: Recharts
- **Deploy**: Vercel

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Stripe

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/fiogestor.git
cd fiogestor
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_live_sua_chave_publica
STRIPE_SECRET_KEY=sk_live_sua_chave_secreta

# URLs
VITE_APP_URL=https://seu-dominio.vercel.app
VITE_SUCCESS_URL=https://seu-dominio.vercel.app/sucesso
VITE_CANCEL_URL=https://seu-dominio.vercel.app/cancelado

# Analytics (opcional)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### 4. Execute o projeto
```bash
npm run dev
# ou
yarn dev
```

Acesse `http://localhost:3000`

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint
npm run lint:fix

# Type checking
npm run type-check

# Deploy para Vercel
npm run deploy
```

## 📱 Deploy

### Vercel (Recomendado)

1. **Conecte ao GitHub**
   - Faça push do código para o GitHub
   - Conecte sua conta Vercel ao repositório

2. **Configure as variáveis de ambiente**
   - No dashboard da Vercel, adicione todas as variáveis do `.env`

3. **Deploy automático**
   - Cada push na branch `main` faz deploy automático

### Deploy Manual
```bash
# Build do projeto
npm run build

# Deploy via Vercel CLI
npx vercel --prod
```

## 💳 Configuração do Stripe

### 1. Crie uma conta no Stripe
- Acesse [stripe.com](https://stripe.com)
- Complete a verificação da conta

### 2. Configure os produtos
```bash
# Instale o Stripe CLI
npm install -g stripe-cli

# Faça login
stripe login

# Crie os produtos
stripe products create --name "FioGestor Starter" --description "Plano básico"
stripe products create --name "FioGestor Professional" --description "Plano profissional"
stripe products create --name "FioGestor Premium" --description "Plano premium"

# Crie os preços
stripe prices create --product prod_xxx --unit-amount 1990 --currency brl --recurring interval=month
stripe prices create --product prod_xxx --unit-amount 19900 --currency brl --recurring interval=year
```

### 3. Configure webhooks
- URL: `https://seu-dominio.vercel.app/api/webhooks/stripe`
- Eventos: `checkout.session.completed`, `customer.subscription.updated`

## 🎨 Customização

### Cores da marca
Edite `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#ec4899', // Rosa principal
        600: '#db2777',
        // ...
      }
    }
  }
}
```

### Templates do WhatsApp
Edite `src/services/whatsapp.ts`:
```typescript
private static defaultTemplates = {
  agendamento: `Sua mensagem personalizada aqui...`,
  // ...
}
```

## 📊 Analytics

### Google Analytics
1. Crie uma propriedade GA4
2. Adicione o ID em `VITE_GA_TRACKING_ID`

### Facebook Pixel
1. Crie um pixel no Facebook Business
2. Adicione o ID em `index.html`

## 🔒 Segurança

- ✅ Todas as chaves sensíveis no servidor
- ✅ Validação de dados com Zod
- ✅ Sanitização de inputs
- ✅ HTTPS obrigatório
- ✅ CSP headers configurados

## 🐛 Troubleshooting

### Erro de build
```bash
# Limpe o cache
rm -rf node_modules package-lock.json
npm install
```

### Erro do Stripe
- Verifique se as chaves estão corretas
- Confirme se a conta está ativa
- Teste com chaves de desenvolvimento primeiro

### Erro de deploy
- Confirme todas as variáveis de ambiente
- Verifique os logs no dashboard da Vercel

## 📈 Roadmap

### Versão 1.1
- [ ] API oficial do WhatsApp
- [ ] Calculadora de preços IA
- [ ] Relatórios avançados
- [ ] App mobile

### Versão 1.2
- [ ] Marketplace integrado
- [ ] Múltiplos ateliês
- [ ] Colaboradores
- [ ] API pública

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 💬 Suporte

- 📧 Email: suporte@fiogestor.com
- 💬 WhatsApp: (11) 99999-9999
- 📚 Documentação: [docs.fiogestor.com](https://docs.fiogestor.com)

## 🙏 Agradecimentos

- [React](https://reactjs.org/) - Framework frontend
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Stripe](https://stripe.com/) - Processamento de pagamentos
- [Vercel](https://vercel.com/) - Hospedagem e deploy
- [Lucide](https://lucide.dev/) - Ícones

---

<div align="center">
  <p>Feito com ❤️ para costureiras brasileiras</p>
  <p>© 2024 FioGestor. Todos os direitos reservados.</p>
</div>


const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');

const bot = new Telegraf(process.env.TON_BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`👋 Bienvenue sur TON Handle Bot !
Envoie /check suivi d’un nom pour voir si le handle est dispo.  
Ex: /check satoshi`);
});

bot.command('check', async (ctx) => {
  const input = ctx.message.text.split(' ')[1];
  if (!input) return ctx.reply('❗️ Utilise : /check tonhandle');

  const handle = `${input.toLowerCase()}.ton`;
  try {
    const res = await fetch(`https://tonapi.io/v2/dns/${handle}`);
    const data = await res.json();

    if (data?.is_available) {
      ctx.reply(`✅ *${handle}* est DISPONIBLE !\n👉 [Acheter sur GetGems](https://getgems.io/dns/${handle})`, {
        parse_mode: 'Markdown'
      });
    } else {
      ctx.reply(`❌ ${handle} est déjà pris.\nEssaye une autre idée !`);
    }
  } catch (err) {
    ctx.reply(`🚨 Erreur. Serveur indisponible ou handle invalide.`);
  }
});

bot.launch();

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { apiToken } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ia')
        .setDescription('Faça uma pergunta')
        .addStringOption(option => option.setName('pergunta').setDescription('Escreva sua pergunta para obter um retorno da IA').setRequired(true)),
    async execute(interaction) {
        const embed = new EmbedBuilder();
        await interaction.deferReply({ ephemeral: true });

        const prompt = interaction.options.getString('pergunta');
        const genAI = new GoogleGenerativeAI(apiToken);
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash'
        });
        const result = await model.generateContent(prompt);
        interaction.editReply({
            embeds: [embed.setTitle('Resposta da IA').setDescription(result.response.text()).setColor('Random').setTimestamp()]
        });
    }
}
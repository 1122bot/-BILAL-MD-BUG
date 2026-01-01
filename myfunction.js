const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const moment = require('moment-timezone');
const path = require("path");
const os = require("os");
let sentImages = new Set();

const config = require("../settings/config.js");

//=================================================//
const databaseDir = path.join(__dirname, 'database');
const premiumPath = path.join(databaseDir, 'premium.json');
const adminPath = path.join(databaseDir, 'admin.json');
const modebotPath = path.join(databaseDir, 'setgrup.json');
const cdPath = path.join(databaseDir, 'cd.json');
const activePath = path.join(databaseDir, 'active.json');

//=================================================//
function ensureDatabaseFiles() {
    if (!fs.existsSync(databaseDir)) {
        fs.mkdirSync(databaseDir, { recursive: true });
    }
    
    if (!fs.existsSync(premiumPath)) {
        fs.writeFileSync(premiumPath, JSON.stringify([], null, 2));
    }
    
    if (!fs.existsSync(adminPath)) {
        fs.writeFileSync(adminPath, JSON.stringify([], null, 2));
    }
    
    if (!fs.existsSync(modebotPath)) {
        fs.writeFileSync(modebotPath, JSON.stringify({ groupOnly: false }, null, 2));
    }
    
    if (!fs.existsSync(cdPath)) {
        fs.writeFileSync(cdPath, JSON.stringify({ time: 300000, commands: {} }, null, 2));
    }
    
    if (!fs.existsSync(activePath)) {
        fs.writeFileSync(activePath, JSON.stringify([], null, 2));
    }
}

//=================================================//
ensureDatabaseFiles();

//=================================================//
let premiumUsers = [];
let adminUsers = [];

try {
    premiumUsers = JSON.parse(fs.readFileSync(premiumPath));
    adminUsers = JSON.parse(fs.readFileSync(adminPath));
} catch (error) {
    ensureDatabaseFiles();
    premiumUsers = [];
    adminUsers = [];
}

//=================================================//
function savePremiumUsers() {
    fs.writeFileSync(premiumPath, JSON.stringify(premiumUsers, null, 2));
}

function saveAdminUsers() {
    fs.writeFileSync(adminPath, JSON.stringify(adminUsers, null, 2));
}

//=================================================//
function isOwner(userId) {
    return config.owner.includes(userId.toString());
}

function isAdminOrOwner(userId) {
    return isOwner(userId) || adminUsers.includes(userId.toString());
}

function isPremium(userId) {
    const now = Date.now();
    const user = premiumUsers.find(u => u.id === userId);
    return user && now < user.expired;
}

//=================================================//
function меню() {
    const images = [
        "https://files.catbox.moe/gvcjfh.jpg",
        "https://files.catbox.moe/gvcjfh.jpg"
    ];
    
    if (sentImages.size >= images.length) {
        sentImages.clear();
    }
    
    let availableImages = images.filter(img => !sentImages.has(img));
    const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];

    sentImages.add(randomImage);
    return randomImage;
}

function bugimg() {
    const images = [
        "https://files.catbox.moe/gvcjfh.jpg",
        "https://files.catbox.moe/gvcjfh.jpg"
    ];
    
    if (sentImages.size >= images.length) {
        sentImages.clear();
    }
    
    let availableImages = images.filter(img => !sentImages.has(img));
    const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];

    sentImages.add(randomImage);
    return randomImage;
}

//=================================================//
async function sendIfNotPremium(ctx) {
    const userId = ctx.from.id.toString();
    if (isPremium(userId) || isAdminOrOwner(userId)) return true;
    
    await ctx.replyWithPhoto(меню(), {
        caption: `*Access Denied: Not Premium* 🚫\n\nThis feature is exclusively available for premium users. Please contact the owner to subscribe and unlock full access.`,
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [[{ text: "⌜ 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿 ⌟", url: "https://t.me/imBilalking_982" }]]
        }
    });
    return false;
}

//=================================================//
async function sendIfNotOwner(ctx) {
    const userId = ctx.from.id.toString();
    if (isAdminOrOwner(userId)) return true;
    
    await ctx.replyWithPhoto(меню(), {
        caption: `*Access Denied: Not Owner* 🚫\n\nThis feature is strictly reserved for the owner only. No other users (including admins) are allowed to use it.`,
        parse_mode: "Markdown",
        reply_markup: {
            inline_keyboard: [[{ text: "⌜ 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗿 ⌟", url: "https://t.me/imBilalking_982" }]]
        }
    });
    return false;
}

//=================================================//
function addPremium(userId, days = 30) {
    const now = Date.now();
    const duration = days * 24 * 60 * 60 * 1000;
    const existing = premiumUsers.find(u => u.id === userId);

    if (existing) {
        existing.expired = Math.max(existing.expired, now) + duration;
    } else {
        premiumUsers.push({ id: userId, expired: now + duration });
    }
    savePremiumUsers();
}

function delPremium(userId) {
    premiumUsers = premiumUsers.filter(u => u.id !== userId);
    savePremiumUsers();
}

function addAdmin(userId) {
    if (!adminUsers.includes(userId)) {
        adminUsers.push(userId);
        saveAdminUsers();
    }
}

function delAdmin(userId) {
    adminUsers = adminUsers.filter(id => id !== userId);
    saveAdminUsers();
}

//=================================================//
function formatBytes(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

function formatRuntime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const parts = [];
    if (hrs > 0) parts.push(`${hrs} hour${hrs > 1 ? 's' : ''}`);
    if (mins > 0) parts.push(`${mins} minute${mins > 1 ? 's' : ''}`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs} second${secs !== 1 ? 's' : ''}`);
    
    return parts.join(', ');
}

//=================================================//
const botStart = Math.floor(Date.now() / 1000);

function getBotRuntime() {
    const now = Math.floor(Date.now() / 1000);
    return formatRuntime(now - botStart);
}

//=================================================//
function logger(ctx, next) {
    const time = moment().tz('Asia/Jakarta').format('HH:mm:ss');
    const date = moment().tz('Asia/Jakarta').format('DD MMMM YYYY');
    const username = ctx.from?.username || ctx.from?.first_name || 'User';
    const userId = ctx.from?.id || 'N/A';
    
    if (ctx.message) {
        const messageText = ctx.message.text || '';
        const isCommand = messageText.startsWith('/');
        const chatType = ctx.chat.type;
        
        if (chatType === 'group' || chatType === 'supergroup') {
            const groupName = ctx.chat.title || 'Unknown Group';
            console.log(chalk.bgBlue.white.bold(`━━━━ ⌜ SYSTEM - GROUP ⌟ ━━━━`));
            console.log(chalk.bgHex('#f39c12').hex('#ffffff').bold(
                ` 📅 Date : ${date} \n` +
                ` 🕐 Clock : ${time} \n` +
                ` 💬 Message : ${isCommand ? 'COMMAND' : 'TEXT'} \n` +
                ` 👤 Sender : @${username} (${userId}) \n` +
                ` 🌐 Group Name : ${groupName}`
            ));
            if (messageText) console.log(chalk.bgHex('#34495e').white.bold(` 📝 Content: ${messageText} `));
            console.log(chalk.bgBlue.white.bold(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`));
            
        } else {
            console.log(chalk.bgBlue.white.bold(`━━━━ ⌜ SYSTEM - PRIVATE ⌟ ━━━━`));
            console.log(chalk.bgHex('#f39c12').hex('#ffffff').bold(
                ` 📅 Date : ${date} \n` +
                ` 🕐 Clock : ${time} \n` +
                ` 💬 Message : ${isCommand ? 'COMMAND' : 'TEXT'} \n` +
                ` 👤 Sender : @${username} (${userId})`
            ));
            if (messageText) console.log(chalk.bgHex('#34495e').white.bold(` 📝 Content: ${messageText} `));
            console.log(chalk.bgBlue.white.bold(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`));
        }
    }
    
    if (ctx.callbackQuery) {
        const chatType = ctx.chat?.type || 'private';
        
        if (chatType === 'group' || chatType === 'supergroup') {
            const groupName = ctx.chat?.title || 'Unknown Group';
            console.log(chalk.bgMagenta.white.bold(`━━━━ ⌜ BUTTON - GROUP ⌟ ━━━━`));
            console.log(chalk.bgHex('#9b59b6').hex('#ffffff').bold(
                ` 📅 Date : ${date} \n` +
                ` 🕐 Clock : ${time} \n` +
                ` 💬 Action : BUTTON CLICK \n` +
                ` 👤 User : @${username} (${userId}) \n` +
                ` 🌐 Group Name : ${groupName}`
            ));
            if (ctx.callbackQuery.data) console.log(chalk.bgHex('#34495e').white.bold(` 🔘 Button: ${ctx.callbackQuery.data} `));
            console.log(chalk.bgMagenta.white.bold(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`));
            
        } else {
            console.log(chalk.bgMagenta.white.bold(`━━━━ ⌜ BUTTON - PRIVATE ⌟ ━━━━`));
            console.log(chalk.bgHex('#9b59b6').hex('#ffffff').bold(
                ` 📅 Date : ${date} \n` +
                ` 🕐 Clock : ${time} \n` +
                ` 💬 Action : BUTTON CLICK \n` +
                ` 👤 User : @${username} (${userId})`
            ));
            if (ctx.callbackQuery.data) console.log(chalk.bgHex('#34495e').white.bold(` 🔘 Button: ${ctx.callbackQuery.data} `));
            console.log(chalk.bgMagenta.white.bold(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`));
        }
    }
    
    return next();
}

//=================================================//
function isGroupOnly() {
    if (!fs.existsSync(modebotPath)) return false;
    const data = JSON.parse(fs.readFileSync(modebotPath));
    return data.groupOnly;
}

function setGroupOnly(status) {
    fs.writeFileSync(modebotPath, JSON.stringify({ groupOnly: status }, null, 2));
}

function saveCooldown() {
    try {
        fs.writeFileSync(cdPath, JSON.stringify(cooldownData, null, 2));
    } catch (error) {}
}

function checkCooldown(commandName) {
    if (!cooldownData.commands) return 0;
    
    if (cooldownData.commands[commandName]) {
        const remainingTime = cooldownData.time - (Date.now() - cooldownData.commands[commandName]);
        if (remainingTime > 0) {
            return Math.ceil(remainingTime / 1000);
        } else {
            delete cooldownData.commands[commandName];
            saveCooldown();
            return 0;
        }
    }
    return 0;
}

function setCooldown(commandName) {
    if (!cooldownData.commands) cooldownData.commands = {};
    
    cooldownData.commands[commandName] = Date.now();
    saveCooldown();
    
    setTimeout(() => {
        if (cooldownData.commands && cooldownData.commands[commandName]) {
            delete cooldownData.commands[commandName];
            saveCooldown();
        }
    }, cooldownData.time);
}

function setCooldownTime(timeString) {
    const match = timeString.match(/(\d+)([smh])/);
    if (!match) return "Incorrect format! Use example: /setjeda 5m";

    let [_, value, unit] = match;
    value = parseInt(value);

    if (unit === "s") cooldownData.time = value * 1000;
    else if (unit === "m") cooldownData.time = value * 60 * 1000;
    else if (unit === "h") cooldownData.time = value * 60 * 60 * 1000;

    saveCooldown();
    return `✅ cooldown is set to ${value}${unit} for all commands`;
}

function getUserStatus(userId) {
    const isOwner = config.owner.includes(userId.toString());
    
    let isPremium = false;
    
    try {
        if (fs.existsSync(premiumPath)) {
            const premiumUsersData = JSON.parse(fs.readFileSync(premiumPath));
            
            const userData = premiumUsersData.find(user => user.id === userId.toString());
            if (userData) {
                if (!userData.expired || new Date(userData.expired) > new Date()) {
                    isPremium = true;
                }
            }
        }
    } catch (error) {
        console.error("Error checking premium status:", error);
    }
    
    if (isOwner || isPremium) {
        return "Premium 🏆";
    }
    
    return "Free ‼️";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Inisialisasi cooldownData
let cooldownData = {};
if (!fs.existsSync(cdPath)) {
    cooldownData = { time: 300000, commands: {} };
    fs.writeFileSync(cdPath, JSON.stringify(cooldownData, null, 2));
} else {
    try {
        cooldownData = JSON.parse(fs.readFileSync(cdPath));
        if (!cooldownData.commands) cooldownData.commands = {};
    } catch (error) {
        cooldownData = { time: 300000, commands: {} };
        fs.writeFileSync(cdPath, JSON.stringify(cooldownData, null, 2));
    }
}

//=================================================//
module.exports = {
    ensureDatabaseFiles,
    isOwner,
    isAdminOrOwner,
    isPremium,
    sendIfNotPremium,
    sendIfNotOwner,
    addPremium,
    delPremium,
    addAdmin,
    delAdmin,
    formatBytes,
    formatRuntime,
    getBotRuntime,
    logger,
    isGroupOnly,
    setGroupOnly,
    меню,
    bugimg,
    premiumUsers,
    adminUsers,
    savePremiumUsers,
    saveAdminUsers,
    saveCooldown,
    checkCooldown,
    setCooldown,
    setCooldownTime,
    getUserStatus,
    sleep,
    cooldownData
};
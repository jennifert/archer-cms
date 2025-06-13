import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import models from './server/models/index.js';

const {
    User, ContentType, Tag, Category, Page, HeaderImage, sequelize
} = models;

const isDev = process.env.NODE_ENV !== 'production';
const args = process.argv.slice(2);
const dbPath = path.resolve('./db.sqlite');
const backupPath = path.resolve('./db.backup.sqlite');

const confirm = (question) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim().toLowerCase());
        });
    });
};

const seed = async () => {
    try {
        if (!isDev) {
            console.log('❌ Refusing to run this script in production.');
            return process.exit(1);
        }

        if (!args.includes('--force')) {
            const answer = await confirm('⚠️ This will DELETE all existing data. Type "yes" to continue: ');
            if (answer !== 'yes') {
                console.log('🛑 Seed aborted by user.');
                return process.exit(0);
            }
        }

        if (fs.existsSync(dbPath)) {
            fs.copyFileSync(dbPath, backupPath);
            console.log('📦 Backup created at db.backup.sqlite');
        }

        await sequelize.sync({ force: true });
        console.log('💥 Database wiped and synced');

        const user1 = await User.create({
            name: 'Jane Doe',
            email: 'jdoe@example.com',
            password: 'password123',
            role: 'admin'
        });

        const user2 = await User.create({
            name: 'Joe Smith',
            email: 'jsmith@example.com',
            password: 'password123',
            role: 'author'
        });

        const type1 = await ContentType.create({ name: 'post' });
        const type2 = await ContentType.create({ name: 'page' });

        const category1 = await Category.create({
            name: 'JavaScript',
            date: new Date(),
            UserId: user1.id
        });

        const category2 = await Category.create({
            name: 'PHP',
            date: new Date(),
            UserId: user2.id
        });

        const tag1 = await Tag.create({ name: 'React', date: new Date(), UserId: user1.id });
        const tag2 = await Tag.create({ name: 'Vanilla', date: new Date(), UserId: user1.id });
        const tag3 = await Tag.create({ name: 'jQuery', date: new Date(), UserId: user2.id });


        const sampleSource = path.resolve('./seed_assets/sample1.jpg');
        const sampleDest = path.resolve('./public/images/sample1.jpg');

        if (!fs.existsSync('./public/images')) {
            fs.mkdirSync('./public/images', { recursive: true });
        }
        fs.copyFileSync(sampleSource, sampleDest);
        console.log('🖼️ Copied sample1.jpg to public/images/');


        await HeaderImage.create({
            filename: 'sample1.jpg',
            mimetype: 'image/jpeg',
            dateSaved: new Date(),
            UserId: user1.id
        });

        const testPage = await Page.create({
        title: 'Welcome to Archer CMS',
        content: 'This is a test post created by the seeder.',
        dateCreated: new Date(),
        dateEdited: new Date(),
        published: true,
        UserId: user1.id,
        CategoryId: category1.id,
        ContentTypeId: type1.id
        });

        await testPage.setTags([tag1, tag2]);

        console.log('✅ Dev seed complete.');
        process.exit(0);

    } catch (err) {
        console.error('❌ Seed failed:', err.message);
        process.exit(1);
    }
};

seed();

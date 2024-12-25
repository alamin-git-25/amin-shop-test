import mysql from 'mysql2/promise';

export const queryes = async ({ query, values = [] }) => {
    const connection = await mysql.createConnection({
        database: process.env.DB,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
    });
    try {
        const [result] = await connection.execute(query, values);
        connection.end();
        return result;
    } catch (error) {
        console.log(error.message);
        return error
    }
}
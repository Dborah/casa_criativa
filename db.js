const sqlite3 =  require('sqlite3').verbose()
const db = new sqlite3.Database('./casa_criativa.db')

db.serialize(function(){
    //criando a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT, 
            category TEXT, 
            description TEXT, 
            link TEXT
        );
    `)

    //inserir dados da tabela
    const query = `
    INSERT INTO ideas(
        image, 
        title, 
        category, 
        description,
        link
    ) VALUES (?, ?, ?, ?, ?);
    `
    const values = [
        "https://image.flaticon.com/icons/svg/753/753016.svg",
        "Meditação",
        "Mentalidade",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam laborum maxime eaque quidem asperiores cumque ipsam modi obcaecati molestiae, voluptatem, quam, numquam molestias culpa exercitationem recusandae labore atque nobis illo.", 
        "https://github.com/Dborah/casa_criativa"
    ]

    /*db.run(query, values, function(err){
        if(err) return console.log(err)

        console.log(this)
    })*/

    //deletar um dado da tabela
    /*db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err){
        if(err) return console.log(err)

        console.log("deletei", this)
    })*/

    //consultar dados da tabela
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err) return console.log(err)

        console.log(rows)
    })
})

module.exports = db
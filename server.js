//usei o express para criar e configurar meu servidor
const express = require("express")
const server = express()

const db = require("./db")

/*const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Curso e Programação",
        category: "Estudo",
        description:" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam laborum maxime eaque quidem asperiores cumque ipsam modi obcaecati molestiae, voluptatem, quam, numquam molestias culpa exercitationem recusandae labore atque nobis illo.", 
        url: "https://github.com/Dborah/casa_criativa"
    }, 
    {
        img: "https://image.flaticon.com/icons/svg/2656/2656955.svg",
        title: "Exercícios",
        category: "Saúde",
        description:" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam laborum maxime eaque quidem asperiores cumque ipsam modi obcaecati molestiae, voluptatem, quam, numquam molestias culpa exercitationem recusandae labore atque nobis illo.", 
        url: "https://github.com/Dborah/casa_criativa"
    }, 
    {
        img: "https://image.flaticon.com/icons/svg/753/753016.svg",
        title: "Meditação",
        category: "Mentalidade",
        description:" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam laborum maxime eaque quidem asperiores cumque ipsam modi obcaecati molestiae, voluptatem, quam, numquam molestias culpa exercitationem recusandae labore atque nobis illo.", 
        url: "https://github.com/Dborah/casa_criativa"
    }, 
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "karaoke",
        category: "Diversão em Família",
        description:" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam laborum maxime eaque quidem asperiores cumque ipsam modi obcaecati molestiae, voluptatem, quam, numquam molestias culpa exercitationem recusandae labore atque nobis illo.", 
        url: "https://github.com/Dborah/casa_criativa"
    }, 
    {
        img: "https://image.flaticon.com/icons/svg/420/420266.svg",
        title: "Pintura",
        category: "Criatividade",
        description:" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam laborum maxime eaque quidem asperiores cumque ipsam modi obcaecati molestiae, voluptatem, quam, numquam molestias culpa exercitationem recusandae labore atque nobis illo.", 
        url: "https://github.com/Dborah/casa_criativa"
    }, 
    {
        img: "https://www.flaticon.com/premium-icon/icons/svg/2791/2791259.svg",
        title: "Cozinhar",
        category: "Diversão em Família",
        description:" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam laborum maxime eaque quidem asperiores cumque ipsam modi obcaecati molestiae, voluptatem, quam, numquam molestias culpa exercitationem recusandae labore atque nobis illo.", 
        url: "https://github.com/Dborah/casa_criativa"
    }, 
] */



//configurar arquivos estáticos
server.use(express.static("public"))

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))

//configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server, 
    noCache: true,
})

// criei um rota
// e capturo o pedido do cliente para responder
server.get("/", function (req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err){
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (idea of reversedIdeas){
            if(lastIdeas.length <  2){
                lastIdeas.push(idea)
            }
        }
        
        return res.render("index.html", { ideas: lastIdeas })
    })   
})

server.get("/ideias", function (req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if(err){
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeas = [...rows].reverse()
        return res.render("ideia.html", { ideas: reversedIdeas })
    })  

})

server.post("/", function(req, res){
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
       req.body.image, 
       req.body.title, 
       req.body.category, 
       req.body.description, 
       req.body.link, 
    ]

    db.run(query, values, function(err){
        if(err){
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")

    })
})


//liguei meu servidor na porta 3000
server.listen(3000)

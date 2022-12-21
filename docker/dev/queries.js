const Pool = require('pg').Pool
const pool = new Pool({
  user: 'bocauser',
  host: 'localhost:8081',
  database: 'bocadb',
  password: 'dAm0HAiC',
  port: 5432,
})

const date = new Date();

/* Lista as competições de programação cadastradas */
const getContestTable = (request, response) => {
  pool.query('SELECT * FROM contesttable', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


/* Cadastra uma nova competição de programação */ 
const postContestTable = (request, response) => {
    pool.query(`INSERT INTO contesttable(contestnumber, contestname, conteststartdate,
         contestduration, contestlastmileanswer, contestlastmilescore, contestlocalsite,
          contestpenalty, contestmaxfilesize, contestactive, contestmainsite, contestkeys,
           contestunlockkey, contestmainsiteurl, updatetime) 
           VALUES (0,"a",123,1,2,3,4,5,6,7,8,9,10,11,${date})`, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

/* Mostra o problema dado pelo id_p no contest id_c */
const getProblemById = (request, response) => {
    pool.query('SELECT * FROM contesttable', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


/* Atualiza a competição de programação dada pelo id_c */
const updateProblemById = (request, response) => {
  const id = parseInt(request.params.id)
  const { problemtable, contestnumber, problemnumber, problemname, problemfullname, problembasefilename, probleminputfilename, probleminputfilehash, fake, problemcolorname, problemcolor, updatetime} = request.body

  pool.query(
    `UPDATE problemtable SET contestnumber = $1, problemnumber = $2, problemname = $3, 	problemfullname = $4, 
    problembasefilename = $5, probleminputfilename = $6, probleminputfilehash = $7, fake = $8, problemcolorname = $9, 
    problemcolor = $10, updatetime = ${date} WHERE id = $11`
    [problemtable, contestnumber, problemnumber, problemname, problemfullname, problembasefilename, probleminputfilename, probleminputfilehash, fake, problemcolorname, problemcolor, updatetime],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

/* Remove a competição de programação dada pelo id_c */
const deleteProblemById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE * FROM contesttable WHERE id = $1', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


module.exports = {
    getContestTable,
    postContestTable,
    getProblemById,
    updateProblemById,
    deleteProblemById,
}
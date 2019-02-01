const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const Cors = require('cors');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'test',
		database: 'mymarksheet'
	}
});

const app = express();

app.use(Cors());
app.use(bodyParser.json());

app.post('/signin', (req,res) => {
	const {email,password} = req.body;

	db.select('*').from('students').where('students.email','=', email)
	.then(response => {
		return res.json(response[0]);
	})
	.catch(err => res.json('error occurred while processing your request'))

})

app.post('/results', (req,res) => {

const rollno = req.body.rollNo.rollNo;
db.select('*').from('students').where('students.rollno','=',rollno)
.then(response => {
//	console.log(response);
	if(response.length)
	{
		db.from('results')
		.where('results.rollno', '=', rollno)
		.then(marksheet => 
		{
			if(marksheet.length)
			{
					db.select('*').from('subjects')
					.then(subjectInfo => {
						for (var i = 0; i < marksheet.length; i++) {
							for (var a = 0; a < subjectInfo.length; a++) {
								if(marksheet[i].subcode === subjectInfo[a].subcode)
								{
									marksheet[i].subName = subjectInfo[a].name;
									marksheet[i].semester = subjectInfo[a].semester;
									marksheet[i].semester = parseInt(marksheet[i].semester, 10);
								}
							}
						}
							return res.json(marksheet);
					})
					.catch(err => console.log('cant get subject name'))
			}
			else
			{
				return res.json('No results uploaded yet!')				
			}
		})
		.catch(err => res.json('unable to get data'))
	}
	else{
		return res.json('no user found');		
	}
})
.catch(err => res.json('An error occurred while processing your request'))

})

app.put('/uploadResults', (req,res) => {
	console.log(req.body);

	const {rollno,subcode,theory,lab,total,grade,gp} = req.body;

    if(!rollno || !subcode || (!theory && theory !== 0) || (!lab && lab !== 0) || (!total && total !== 0) || !grade || (!gp && gp !== 0))
    {
//      alert('Invalid data submitted!');
      console.log('error');
      if(lab === 0)
      {
      	console.log(true);
      }
    }
    else
    {
	db.insert(
		{
			rollno: rollno,
			subcode: subcode,
			theory: theory,
			lab: lab	,
			total: (theory+lab),
			grade: grade,
			gp: gp 
		}
	)
	.into('results')
	.then(response => {
		if(response.command)
		{
		return res.json('data updated!');
		}
		else 
		{
		return res.json('error uploading data');
		}
	})
	.catch(err => res.json('error occurred while processing your data entry request..'))
}
	})

app.listen(3000, () => {
	console.log('running on port 3000');
})

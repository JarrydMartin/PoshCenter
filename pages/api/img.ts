const formidable = require('formidable');

export default (req, res) => {

	const form = formidable({ multiples: true });
      
    form.parse(req, (err, fields, files) => {
      res.end(JSON.stringify({ fields, files }, null, 2));
    });
  }
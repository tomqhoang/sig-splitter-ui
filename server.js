import express from 'express'; 
import {split, combine} from './index.js';
import bodyParser from 'body-parser';
const port = process.env.PORT || 3001;

const page = express();

page.use(express.static('public'));
page.set('view engine', 'ejs')
page.use(bodyParser.urlencoded({ extended: true }));

page.get('/', function (req, res) {
    res.render('home', {sig: null, v: null, r: null, s: null, error: null});
})

page.listen(port, function () {
    console.log('sig splitter on port ' + port);
})

page.post('/', function (req, res) {
    let input_sig = req.body.sig;
    let input_v = req.body.v;
    let input_r = req.body.r;
    let input_s = req.body.s;
    if(input_sig == undefined)
    {
        if(input_v == undefined)
        {
            res.render('home', {sig: null, v: null, r: null, s: null, error: "need correct input"});
        }
        else
        {
            let input_sig = combine(input_v, input_r, input_s);
            res.render('home', {sig: input_sig, v: input_v, r: input_r, s: input_s, error: null});
            console.log(input_sig, input_components.v, input_components.r, input_components.s);
        }
    }
    else
    {
        let input_components = split(input_sig);
        res.render('home', {sig: input_sig, v: input_components.v, r: input_components.r, s: input_components.s, error: null});
        console.log(input_sig, input_components.v, input_components.r, input_components.s);
    }
})

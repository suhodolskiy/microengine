var Providers = require('../../../../models/providers.js').Providers,
    async = require('async');

exports.post = function(req, res, next) {
    var body = req.body;

    async.waterfall([
        function(callback){
            Providers.findOne({_id: body.id}, callback);
        },
        function(page, callback){
            res.send(JSON.stringify({
                id: {
                    text: page._id,
                    name: 'id',
                    type: 'input'
                },
                name : {
                    text: page.name,
                    name: 'name',
                    type: 'input'
                },
                url : {
                    text: page.address,
                    name: 'address',
                    type: 'input'
                },
                unp: {
                    text: page.unp,
                    name: 'unp',
                    type: 'input'
                },
                phone: {
                    text: page.phone,
                    name: 'phone',
                    type: 'input'
                },
                email: {
                    text: page.email,
                    name: 'email',
                    type: 'input'
                },
                bank_name: {
                    text: page.bank.name,
                    name: 'bank_name',
                    type: 'input'
                },
                bank_address: {
                    text: page.bank.address,
                    name: 'bank_address',
                    type: 'input'
                },
                bank_mfo: {
                    text: page.bank.mfo,
                    name: 'bank_mfo',
                    type: 'input'
                },
                expense: {
                    text: page.bank.expense,
                    name: 'expense',
                    type: 'input'
                }
            }));
        }
    ]); 
};
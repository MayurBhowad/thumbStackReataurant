
const router = require('express').Router();
const Bill = require('../models/bill.model');


//@desc     testing
//@route    /
//access    public
router.get('/', (req, res) => {
    res.send('Hello')
})

//@desc     get order bill details
//@route    /general/recieveBill
//access    public
router.post('/recieveBill', (req, res) => {
    let userId;
    var rightNow = new Date();
    var billNumber = req.body.billNumber ? req.body.billNumber : rightNow.toISOString().replace(/[^0-9]/g, "");

    const newBill = {
        billNumber: billNumber,
        customerName: req.body.customerName,
        foodList: req.body.foodList,
        phoneNumber: req.body.phone,
        tip: req.body.tip
    }

    Bill.findOne({ billNumber: req.body.billNumber }).then(bill => {
        if (bill) {
            Bill.findOneAndUpdate({ billNumber }, newBill)
                .then(a => res.status(200).json(a));
        } else {

            const bill = new Bill({
                billNumber: billNumber,
                customerName: req.body.customerName,
                foodList: req.body.foodList,
                phoneNumber: req.body.phone,
                tip: req.body.tip
            })
            // res.json(bill)

            bill.save()
                .then(bill => res.status(200).json(bill))
                .catch(err => console.log(err));
        }
    })
})

router.get('/billNumber/:billNumber', (req, res) => {
    Bill.find({ billNumber: req.params.billNumber })
        .then(ress => res.status(200).json(ress.reverse()))
})
router.get('/phoneNumber/:phoneNumber', (req, res) => {
    Bill.find({ phoneNumber: req.params.phoneNumber })
        .then(ress => res.status(200).json(ress.reverse()))
})



module.exports = router;
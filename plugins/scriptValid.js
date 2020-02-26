const validTwo = new Validator({
    selector: '#form2',
    pattern: {},
    method: {
        'form2Name': [
            ['notEmpty'],
            ['pattern', 'youName']
        ],
        'form2Message': [
            ['notEmpty'],
            ['pattern', 'youMessage']
        ],
        'form2Email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'form2Phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ]
    }
});
validTwo.init();

const valid = new Validator({
    selector: '#form1',
    pattern: {},
    method: {
        'form1Name': [
            ['notEmpty'],
            ['pattern', 'youName']
        ],
        'form1Email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'form1Phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ]
    }
});
valid.init();

const validThree = new Validator({
    selector: '#form3',
    pattern: {},
    method: {
        'form3Name': [
            ['notEmpty'],
            ['pattern', 'youName']
        ],
        'form3Email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'form3Phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ]
    }
});
validThree.init();
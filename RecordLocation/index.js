const sql = require('mssql');

module.exports = function (context, req) {
    let lat = req.query.lat;
    let long = req.query.long;
    let speed = req.query.speed | 0.0;
    let device = req.query.device | 0;

    console.log(JSON.stringify(req.query));

    console.log(`Location: ${lat},${long}`);

    const config = {
        user: process.env.sqlUser,
        password: process.env.sqlPassword,
        server: process.env.sqlServer,
        database: process.env.sqlDb,
    
        options: {
            encrypt: true
        }
    }

    sql.connect(config, err => {
        console.log('Connected to database');

        let request = new sql.Request();
        request.input('Lat', sql.Float, lat);
        request.input('Long', sql.Float, long);
        request.input('Speed', sql.Float, speed);
        request.input('Device', sql.Int, device);

        request.query('Insert into Location (Lat, Long, Speed, Device) Values(@Lat,@Long,@Speed,@Device)',
            (err, result) => {
                console.log('Insert call complete');

                if(err) {
                    console.log('Error during insert: ' + err);
                    res = {
                        status: 500,
                        body: 'Error'
                    };    
                } else {
                    console.log('Inserted');
                    res = {
                        body: 'Success'
                    };
                }

                sql.close();
                context.done(null, res);
            }
        );
    });  
};
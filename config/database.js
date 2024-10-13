const mongoose=require('mongoose')

const dataconn=()=>{
    const mongoURI = 'mongodb://localhost:27017/test';
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('MongoDB connectedpppppppppppppppppppppppppppppppppppppp...')).catch(err => console.log('MongoDB connection error:', err));
    
   
}

module.exports=dataconn
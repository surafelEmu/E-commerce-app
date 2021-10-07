class APIFeatures {
    constructor(query , queryStr) {
        this.query = query  ;
        this.queryStr = queryStr ;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword ,
                $options: 'i'
            }
        }: {}

        console.log(keyword) ;

        this.query = this.query.find({...keyword}) ;
        return this ;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1 ;
        const skip = resPerPage * (currentPage - 1) ;

        this.query = this.query.limit(resPerPage).skip(skip) ;
        return this ;
    }

    filter() {

        //filtering
        const queryCopy = { ...this.queryStr} ;
    
        const removeFields = ['keyword' , 'limit' , 'page'] ;
        removeFields.forEach(el => delete queryCopy[el]) ;


        //advanced filtering
        let queryStr1 = JSON.stringify(queryCopy) ;
        let queryStr = queryStr1.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        console.log(queryStr) ;
        this.query = this.query.find(JSON.parse(queryStr)) ;

        return this ;
    }
    

}



module.exports = APIFeatures ;
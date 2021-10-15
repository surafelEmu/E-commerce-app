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

        // const queryCopy = { ...this.queryStr };

        // // Removing fields from the query
        // const removeFields = ['keyword', 'limit', 'page']
        // removeFields.forEach(el => delete queryCopy[el]);

        // // Advance filter for price, ratings etc
        // let queryStr = JSON.stringify(queryCopy)
        // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)


        // this.query = this.query.find(JSON.parse(queryStr));
        // return this;

        const queryObj = { ...this.queryStr };
       const excludedFields = ['keyword' ,'page', 'sort', 'limit', 'fields'];
       excludedFields.forEach(el => delete queryObj[el]);
    
        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(queryStr) ;
        this.query = this.query.find(JSON.parse(queryStr));
    
        return this;
    }

    
    
    

}



module.exports = APIFeatures ;
const Books = require('../models/bookModel')
const BorrowBooks = require('../models/borrowBookModel')
const ReturnBook = require('../models/returnBookModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const ApiFeatures = require('../utils/apifeature')
const cloudinary = require("cloudinary");


//create product by admin//
exports.createBook = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id
    const nameExist = await Books.findOne({ name: req.body.name })
if(nameExist) {
    return res.status(422).json({ error: "Book already Uploaded" })

}
    const book = await Books.create(req.body)
    

    res.status(201).json({
        success: true,
        message: 'Book Uploaded successfully',
        book
    })

})

//get all books//
exports.getAllBooks = catchAsyncError(async (req, res,next) => {

    const books = await Books.find()
      res.status(200).json(
          {
              success: true,
              books
          })
         
  })
  
//get all books by admin

exports.getBooksByAdmin = catchAsyncError(async (req, res,next) => {
    const books = await Books.find()
      res.status(200).json(
          {
              success: true,
              books,
          })
         
  })
  


//delete book by admin//
  exports.deleteBook = catchAsyncError(async (req, res, next) => {
    let book = await Books.findById(req.params.id)
    if (!book) {
        return next(new ErrorHandler("Book not found", 404))
    }

    await book.remove()
    res.status(200).json({
        success: true,
        message: "Book delete succesfully"
    })
})


//request borrow books//

exports.requestedBorrowBooks = catchAsyncError(async (req, res, next) => {
    const { bookname, request} = req.body
    const borrowReq = await BorrowBooks.create({
        bookname,
        request,
        bookId:req.body.bookId,
        user: req.user._id,
        borroewdAt:Date.now()
    })


    res.status(201).json({
        success: true,
        message: 'Book Borroed Request Send',
        borrowReq
    })



})


exports.seeRequestedBorrowBooks = catchAsyncError(async (req, res, next) => {
    const id = req.user._id
    const books = await BorrowBooks.find({user:id})
    res.status(201).json({
        success: true,
        message: 'get books',
        books
    })
})

//get all requested for borrow books for admin//
exports.getAllRequestedBooksDetails = catchAsyncError(async (req, res, next) => {
    const bookdetails = await BorrowBooks.find()
    res.status(200).json({
        success: true,
        bookdetails
    })
})


//update request by admin//

exports.updateRequest = catchAsyncError(async (req, res, next) => {

    let d = new Date();
    let delivered = d.setDate(d.getDate() + 7);
    const dueDate = new Date(delivered).toISOString().substring(0, 10);


    const newUserData = {
        request:req.body.request,
        dueDate
    }
    
    const user = await BorrowBooks.findByIdAndUpdate(req.params.newId, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    const books = await Books.findById(req.params.id)
    books.issued = true
    books.status = "Not-Avaliable"
    await books.save()
    res.status(200).json({
        success: true,
        message:"Request update succesfully..",
        user
    })
})



exports.returnBooksAccept = catchAsyncError(async (req, res, next) => {
   
console.log(req.params.bookid)
    const books = await Books.findById(req.params.bookid) //get bookId
    const book = await ReturnBook.findById(req.params.id) //get_id
   
    books.issued = false
    books.status = "Avaliable"
    await books.save()
    await book.remove()
  
    res.status(200).json({
        success: true,
        message:"Book Return..",
    })
})
//return book request////////////////////////////////

exports.returnBooksRequest = catchAsyncError(async (req, res, next) => {

    const { bookname,bookId,request,isreturn,user} = req.body
    const returnReq = await ReturnBook.create({
        bookname,
        bookId,
        request,
        isreturn,
        user,
        returnDate:Date.now()
    })


    res.status(201).json({
        success: true,
        message: 'Book Return Request Send...',
        returnReq
    })
})


//get all return requested books////////////////////////////////////////////////////////////////

exports.seeRequestedReturnBooks = catchAsyncError(async (req, res, next) => {
    const books = await ReturnBook.find()
    res.status(201).json({
        success: true,
        message: 'get books',
        books
    })
})




//all books get that issued by admin in a day////////////////////////////////

exports.getBooksbyDay = catchAsyncError(async (req, res,next) => {
    const books = await BorrowBooks.find()

    const todayIssuedBooks = await books.filter((ele)=>{
        if(ele.request==="issued")
        return true
    })


      res.status(200).json(
          {
              success: true,
              todayIssuedBooks,
          })
         
  })



// exports.acceptBorrowBooks = catchAsyncError(async (req, res, next) => {
//     const request = req.body.request
//     if(request){
//         const request = req.body.price * discount/100
//         req.body.actualpricebydiscount = req.body.price - discountData
//     }
//     const borrowReq = await BorrowBooks.create({
//         bookname,
//         request,
//         bookId:req.body.bookId,
//         user: req.user._id,
//         borroewdAt:Date.now()
//     })

//     res.status(201).json({
//         success: true,
//         message: 'Book Borroed Request Send',
//         borrowReq
//     })



// })




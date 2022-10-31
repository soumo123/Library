const express = require('express')
const router = express.Router()
const {createBook,getAllBooks,getBooksByAdmin,deleteBook,requestedBorrowBooks, seeRequestedBorrowBooks, getAllRequestedBooksDetails, updateRequest, getBooksbyDay, returnBooksRequest, seeRequestedReturnBooks, returnBooksAccept} = require('../controllers/bookController')
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')


router.route('/books').get(getAllBooks)
router.route('/books/borrow/request/:token').post(isAuthenticatedUser,requestedBorrowBooks)
router.route('/books/borrowbooks/:token').get(isAuthenticatedUser,seeRequestedBorrowBooks)
router.route("/books/returnbooks/:token").post(isAuthenticatedUser,returnBooksRequest)

router.route('/admin/book/new/:token').post(isAuthenticatedUser, authorizeRoles("admin"),createBook)
router.route('/admin/book/:id/:token').delete(isAuthenticatedUser, authorizeRoles("admin"),deleteBook)
router.route("/admin/book/:token").get(isAuthenticatedUser,authorizeRoles("admin"),getBooksByAdmin)
router.route("/admin/books/:token").get(isAuthenticatedUser, authorizeRoles("admin"),getAllRequestedBooksDetails)
router.route("/admin/user/:id/:newId/:token").put(isAuthenticatedUser,authorizeRoles("admin"),updateRequest)
router.route("/admin/issuedbooks/:token").get(isAuthenticatedUser,authorizeRoles("admin"),getBooksbyDay)
router.route("/admin/return/books/:token").get(isAuthenticatedUser, authorizeRoles("admin"),seeRequestedReturnBooks)
router.route("/admin/returnbooks/accept/:bookid/:id/:token").put(isAuthenticatedUser, authorizeRoles("admin"),returnBooksAccept)







module.exports = router


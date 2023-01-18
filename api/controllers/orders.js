const mongoose = require('mongoose')
const Order = require('../models/orders')
const Product = require('../models/products')


exports.orders_get_all_order = (req, res) => {
    Order.find()
      .select("_id product quantity")
      .sort({ quantity: 1 })
      .populate('product','name _id price')
      .exec()
      .then((result) => {
        res.status(200).json({
          Total_count: result.length,
          message: "Orders Stored",
          orders: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }

  exports.orders_create_oder = (req, res) => {
    // console.log(req.body.productId)
  Product.findById(req.body.productId)
    .then(result => {
     console.log(result)
      if (!result) {
        return res.status(404).json({
          message: "Product not found",
        })
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
      });
      console.log(order)
      return order.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Order Stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity,
        },
        request: {
          type: "GET",
          url: "http://localhost:4500/api/orders/" + result._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

exports.orders_get_order = (req, res) => {
    const id = req.params.orderId;
    Order.findById(id)
      .select("id product quantity")
      .populate('product')
      .exec()
      .then((result) => {
        if (!result) {
          return res.status(404).json({
            message: "Order Not Found",
          });
        }
        console.log(result);
        res.status(201).json({
          result: result,
          request: {
            type: "GET",
            url: "http://localhost:4500/api/orders",
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }


  exports.orders_delete_oder = (req, res) => {
    const id = req.params.orderId;
    Order.remove({ _id: id })
      .exec()
      .then((result) => {
        res.status(201).json({
          message: "Order Deleted",
          request: {
            type: "POST",
            url: "http://localhost:4500/api/orders",
            body: { productId: "ID", quantity: "Number" },
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
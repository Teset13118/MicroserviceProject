const Product = require('../models/Product');
const Category = require('../models/Category');  

// เพิ่มสินค้าใหม่
exports.addProduct = async (req, res) => {
    try {
        const { name, sku, quantity, category, price } = req.body;

        // ตรวจสอบว่าสินค้า SKU นี้มีอยู่แล้วหรือป่าว
        const getProduct = await Product.findOne({ sku });
        if (getProduct) {
            return res.status(400).json({ message: 'SKU นี้มีอยู่แล้ว' });
        }

        // สร้างสินค้าใหม่
        const newProduct = new Product({
            name,
            sku,
            quantity,
            category,
            price,
            expiration_date,
        });

        // บันทึกลงฐานข้อมูล
        await newProduct.save();

        res.status(201).json({ message: 'เพิ่มสินค้าเรียบร้อย', product: newProduct });

    } catch (error) {
        console.log(error.massage)
        res.status(500).json({ status: "error", 
            message: "เกิดข้อผิดพลาด  ", error
        });
    }
};




// ดูรายละเอียดสินค้า แต่ละตัว
exports.getProduct = async (req, res) => {
    try {
        const { sku } = req.params;
        // ค้นหาข้อมูลจาก sku
        const product = await Product.findOne({ sku }).populate('category', 'name') 

        if (!product) return res.status(404).json(
            { status: "error", 
            message: "Product not found" 
            });

        res.status(200).json({ status: "success", data: product });

    } catch (error) {
        console.log(error.massage)
        res.status(500).json({ status: "error", message: error.message });
    }
};


// ดึงข้อมูลสินค้า วัสดุ ทั้งหมด
exports.getAllProduct = async (req, res) => {
    try {
        
        const product = await Product.find().populate('category', 'name'); 

        if (!product || product.length === 0) {
            return res.status(404).json({ status: "error", message: "ไม่พบข้อมูลสินค้า" });
        }

        res.status(200).json({ status: "success", data: product });

    } catch (error) {
        console.log(error.massage)
        res.status(500).json({ status: "error", message: error.message });
    }
};





// แก้ไขข้อมูลสินค้า
exports.updateProduct = async (req, res) => {

    try{
        const { id } = req.params;  
        const { name, sku, quantity, category, price, status } = req.body;

        console.log("id ->",id)

        // อัปเเดตข้อมูลสินค้า
        const updateProduct = await Product.findByIdAndUpdate(
            id,
            {
                ...(name && { name }),
                ...(sku && { sku }),
                ...(quantity && { quantity }),
                ...(category && { category }),
                ...(price && { price }),
                ...(status && { status }),
                last_updated: Date.now() // อัปเดตเวลาการแก้ไข
            },
            { new: true, runValidators: true } // คืนค่าที่อัปเดตและตรวจสอบ validation
        )

        if(!updateProduct){
            res.status(404).json({
                status:"error",
                massage:"ไม่พบข้อมูลสินค้าที่ต้องการแก้ไข"
            })
        }

        res.status(200).json({
            status:"success",
            data: updateProduct
        })



    }catch(error){
        console.log(error.massage)
        res.status(500).json({ status: "error", message: error.message });
    }
    
};

// ลบสินค้า
exports.deleteProduct = async (req, res) => {

    try{
        const { id } = req.params
        console.log("Product ID:", id);

        const deleteProduct = await Product.findByIdAndDelete(id)
        if(!deleteProduct){
            res.status(404).json({
                status:"error",
                massage:"ไม่พบข้อมูลสินค้าที่ต้องการลบ"
            })
        }

        res.status(200).json({
            status:"success",
            // data: deleteProduct
        })



    }catch(error){
        console.log(error.massage)
        res.status(500).json({ status: "error", message: error.message });
    }
   
};


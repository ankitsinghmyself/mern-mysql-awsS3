const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const saltRounds = 10;
const User = require('../models/user');
require('dotenv').config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

// function to handle user registration
exports.register = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, mobile, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { mobile: mobile } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this mobile number',
      });
    }

    const result = await User.findOne({
      order: [['id', 'DESC']],
      attributes: ['id'],
      raw: true,
    });

    let nextPrimaryKeyID = 1; // Default value if no user exists yet

    if (result && result.id) {
      nextPrimaryKeyID = result.id + 1;
    }

    // Continue with the registration logic here
    const file = req.files.profile_pic_url;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // generate unique filename for S3
    const uniqueFilename = `${uuidv4()}.${file.name.split('.').pop()}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: uniqueFilename,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    // upload the file to S3
    s3.upload(params, async (err, data) => {
      if (err) {
        console.error(err);
        // return res.status(500).json({ error: 'Failed to upload file' });
      }
      let pic_url = '';
      if (data) {
        console.log(data.Location);
        pic_url = data.Location;
      } else {
        pic_url = 'https://cdn-icons-png.flaticon.com/512/219/219970.png';
      }
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const createdUser = await User.create({
          firstName,
          lastName,
          mobile,
          password: hashedPassword,
          profile_pic_url: pic_url, // Set the profile pic URL
          createdBy: nextPrimaryKeyID, // Set createdBy value as needed
          updatedBy: nextPrimaryKeyID, // Set updatedBy value as needed
        });

        res.status(201).json({
          success: true,
          message: 'User created successfully',
          user: createdUser,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: 'Error creating user',
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
    });
  }
};

// function to handle user login
exports.login = async (req, res) => {
  const { mobile, password } = req.body;
  try {
    // find user by mobile number
    const user = await User.findOne({
      where: {
        mobile: mobile,
      },
    });
    // if user not found
    if (!user) {
      return res
        .status(401)
        .json({ error: 'Invalid mobile number or password' });
    }

    // compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // if password does not match
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: 'Invalid mobile number or password' });
    }

    // generate JWT token and return it in the response
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: '1d',
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        profile_pic_url: user.profile_pic_url,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

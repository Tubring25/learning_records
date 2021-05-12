const adminModule = require('../model').Admin;
const CustomerModule = require('../model').Customer
const ServerModule = require('../model').Server
const { createToken, verifyToken } = require('../utils/index')
const formiable = require('formidable');
const fs = require('fs');
const path = require('path');

class adminCto {
  constructor() {
    // this.instance = adminModule
  }
  async login (body) {
    let {username, password, type} = body
		if (!username) {
			return {code: 0, msg: '缺少用户名'}
		} else if (!password) {
			return { code: 0, msg: "缺少密码" };
		} else {
			try{
        let res
        console.log(typeof(type))
        switch (Number(type)) {
          case 0:
            res = await adminModule.findAll({ where: { Manager_Name: username } });
            break;
          case 1:
            res = await ServerModule.findAll({ where: { Server_Name: username } });
            break;
          case 2:
            res = await CustomerModule.findAll({ where: { Customer_Name: username } });
            break;
          default:
            break;
        }
        console.log(res)
        // return
        if(res.length == 0) {
          return { code: 0, msg: '查无此用户' };
        } else {
          let code
          switch (Number(type)) {
            case 0:
              code = 'Manager_Code'
              break;
            case 1:
              code = 'Server_Code'
              break;
            case 2:
              code = 'Customer_Code'
              break;
            default:
              break;
          }
          if (res[0][code] == password) {
            return { code: 1, data: {token: createToken(res[0])} };
          } else {
            return { code: 0, msg: '密码错误'};
          }
        }
      }
      catch (err) {
        console.log('err',err);
        return {code: 0, msg: JSON.stringify(err)}
      }
		}
	}
  getUserInfo(token){
    console.log(token)
		let res = verifyToken(token)
		if (res.data){
			return {code: 1, data: res.data}
		} else {
			return {code: 3, data: res}
		}
	}
  async uploadSingleImg(req){
    let form = new formiable.IncomingForm();
    form.encoding = 'utf-8';
    
    form.uploadDir = path.join(__dirname, '../public/upload'); 
    form.keepExtensions = true; // 是否包括 扩展名
    form.maxFieldsSize = 4 * 1024 * 1024; // 最大字节数
    // new Promise((resolve, rejects) => {

    // })
    let upload = new Promise((resolve, rejects) => {
      form.parse(req, (err, fields, files) => {
        let file = files.file
        if(err) {
          rejects({code: 0, msg: '上传失败'})
        }
        if (file.size > form.maxFileSize) {
          fs.unlink(file.path);
          rejects({code: 0, msg: '图片不得超过4M'})
        }
        let extName = ''
        if (file.type == "image/png" || file.type == "image/x-png") {
          extName = "png";
        } else if (file.type == "image/jpg" || file.type == "image/jpeg") {
          extName = "jpg";
        }
        if(extName.length == 0) {
          rejects({code: 0, msg: '只支持png与jpg格式的图片'})
        }
        let timestamp = Number(new Date())
        let num = Math.floor(Math.random() * 1000)
        let imageName = `${timestamp}_${num}.${extName}`;
        let newPath = form.uploadDir + '/' + imageName
        fs.rename(file.path, newPath, (err) => {
          if (err) {
            rejects({code: 0, msg: 'error'})
          }
        });
        resolve({code: 1, path: 'upload/'+imageName}) 
      })
    })
    let res = await upload
    return res
  }
}

module.exports = new adminCto()
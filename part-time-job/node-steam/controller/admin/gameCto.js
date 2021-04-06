const gameModule = require('../../model').Game;
const systemRequirementModule = require('../../model').SystemRequirement
const GameImg = require('../../model').GameImg
const fs = require('fs');
const path = require('path');
const formiable = require('formidable');
const sequelize = require('sequelize');
const Op = sequelize.Op

class gameCto {
  constructor() {
    this.instance = gameModule
  }
  async create(body) {
    const { name, desc, img_list, release_date, developer, publisher, game_type, price, systemRequirement, is_onshelf, is_sale, sale_price } = body
    try {
      let hasOne = await this.instance.findAll({ where: { name: name } })
      if (hasOne.length > 0) {
        return { code: 0, msg: '不可重复添加' }
      }
      let res = await this.instance.create({ name: name, desc: desc, release_date: release_date, developer: developer, publisher: publisher, game_type: game_type, price: price,
        is_onshelf: is_onshelf, is_sale: is_sale, sale_price: sale_price})
      let ImgList = img_list.split(',').map(a=>{return {path: a, game_id: res.id, include: [{model: gameModule, as: 'Game'}]}})
      let SysRequirement = JSON.parse(systemRequirement)
      let srList = SysRequirement.map(a=>{
        return {req_type: a.req_type, handle_system: a.handle_system, cpu: a.cpu, ram: a.ram, ram_unit: a.ram_unit, 
          gpu: a.gpu, storage_space: a.storage_space, storage_space_unit: a.storage_space_unit, game_id: res.id,
          include: [{model: gameModule, as: 'Game'}]  
        }
      })
      await GameImg.bulkCreate(ImgList)
      await systemRequirementModule.bulkCreate(srList)
      return { code: 1, data: '创建成功', goodId: res.id }
    }
    catch (err) {
      console.log(err)
      return { code: 0, msg: JSON.stringify(err) }
    }
  }
  // 后台获取游戏列表
  async getGameList(body) {
    try {
      let {pageSize, pageNum, title, type} = body
      
      if(body.is_sale) {
        let res = await this.instance.findAndCountAll({
          limit: Number(pageSize),
          offset: Number(pageNum - 1) * Number(pageSize),
          where: {name: {[Op.like]: `%${title}%`}, is_sale: 1, is_onshelf: 1},
          distinct: true,
          include: [{
            model: GameImg
          }]})
        return { code: 1, data: res }
      } else if(body.is_onshelf) {
        let res = await this.instance.findAndCountAll({
          limit: Number(pageSize),
          offset: Number(pageNum - 1) * Number(pageSize),
          where: {name: {[Op.like]: `%${title}%`}, is_onshelf: 1},
          distinct: true,
          include: [{
            model: GameImg
          }]})
        return { code: 1, data: res }
      } else {
        let res = await this.instance.findAndCountAll({
          limit: Number(pageSize),
          offset: Number(pageNum - 1) * Number(pageSize),
          where: {name: {[Op.like]: `%${title}%`}},
          distinct: true,
          include: [{
            model: GameImg
          }]})
        return { code: 1, data: res }
      }
    } catch (err) { 
      console.log(err)
      return { code: 0, msg: JSON.stringify(err) } }
  }
  // 获取上架 || 打折商品
  // async getShelfSaleGameList(body) {
  //   if(is_sale)
  // }
  // 获取单独一条
  async getGameById(data) {
    const { id } = data
    if (!id) {
      return { code: 0, msg: '缺少id' }
    }
    try {
      let res = await this.instance.findAll({
        where: { id: id }, 
        include: [
          {model: systemRequirementModule, where: { game_id: id }},
          {model: GameImg, where: {game_id: id}}
        ]
      })
      if (res.length > 0) {
        return { code: 1, data: res[0] }
      } else {
        return { code: 0, msg: '无此商品' }
      }
    } catch (err) {
      console.log('error',err)
      return { code: 0, msg: JSON.stringify(err) }
    }
  }
  // 删除
  async deleteGameById(data) {
    const { id } = data
    if (!id) {
      return { code: 0, msg: '缺少id' }
    }
    try {
      this.instance.destroy({ where: { id: id } })
      console.log(id)
      let hasSR = await systemRequirementModule.findAll({ where: { goods_id: id } })
      if (hasSR.length > 0) {
        let hasSRIds = hasSR.map(a => a.id)
        console.log(hasSRIds)
        await systemRequirementModule.destroy({ id: hasSRIds })
      }
      return { code: 1, data: '删除成功' }
    } catch (err) { 
      // console.log(err)
      return { code: 0, msg: JSON.stringify(err) } }
  }
  async edit(body) {
    const { id, name, desc, release_date, developer, publisher, game_type, price, is_onshelf, systemRequirement, is_sale, sale_price } = body
    try {
      let hasOne = await this.instance.findAll({ where: { id: id } })
      if (hasOne.length < 1) {
        return { code: 0, msg: '无此数据' }
      }
      this.instance.update({ name: name, desc: desc, release_date: release_date, developer: developer, publisher: publisher, game_type: game_type, price: price, is_onshelf: is_onshelf,
        is_sale: is_sale, sale_price: sale_price }, { where: { id: id } })
      let SysRequirement = JSON.parse(systemRequirement)
      let srList = SysRequirement.map(a=>{
        return {req_type: a.req_type, handle_system: a.handle_system, cpu: a.cpu, ram: a.ram, ram_unit: a.ram_unit, 
          gpu: a.gpu, storage_space: a.storage_space, storage_space_unit: a.storage_space_unit
        }
      })
      await systemRequirementModule.update(srList[0],{where:{id: SysRequirement[0].id}})
      await systemRequirementModule.update(srList[1],{where:{id: SysRequirement[1].id}})
      return { code: 1, data: '修改成功' }
    }
    catch (err) {
      console.log(err)
      return { code: 0, msg: JSON.stringify(err) }
    }
  }

  // 单张图片上传
  async uploadSingleImg(req){
    let form = new formiable.IncomingForm();
    form.encoding = 'utf-8';
    
    form.uploadDir = path.join(__dirname, '../../public/upload'); 
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

module.exports = new gameCto()
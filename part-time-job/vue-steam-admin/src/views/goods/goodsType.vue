<template>
  <div class="container mx-auto w-11/12 my-8 py-6">
    <el-button type="primary" @click="tableBtn(0)">新建</el-button>
    <el-table :data="goodsTypeList" style="width: 60%" border>
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="name" label="操作" width="180">
        <template scope="{row}">
          <el-button type="info" @click="tableBtn(1, row)">编辑</el-button>
          <el-button type="danger" @click="deleteType(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogStatus==0?'添加':'编辑'" :visible.sync="dialogVisible">
      <el-form :model="dialogFrom">
        <el-form-item label="类型名称">
          <el-input v-model="dialogFrom.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getGoodsType, addGoodsType, editGoodsType, deleteGoodsType, } from "@/api/goodsType";
export default {
  data() {
    return {
      goodsTypeList: [],
      dialogStatus: 0,
      dialogVisible: false,
      dialogFrom: {name: ''}
    };
  },
  created() {
    this.getGoodsType_();
  },
  methods: {
    getGoodsType_() {
      getGoodsType().then((res) => {
        if (res.code) {
          this.goodsTypeList = res.data;
        }
      });
    },
    tableBtn(type, row) {
      this.dialogStatus = type
      this.dialogVisible = true
      if(type) this.dialogFrom = row
    },
    confirmBtn () {
      if(this.dialogFrom.name.trim() == '') {
        this.$message.warning('请输入名称')
        return
      }
      if(this.dialogStatus) {
        editGoodsType(this.dialogFrom).then(res=>{
          if(res.code) {
            this.$message.success('修改成功')
            this.getGoodsType_()
            this.dialogVisible= false
          }
        })
      } else {
        addGoodsType(this.dialogFrom).then(res=>{
          if(res.code) {
            this.$message.success('添加成功')
            this.getGoodsType_()
            this.dialogVisible= false

          }
        })
      }
    },
    deleteType(id){
      deleteGoodsType({id:id}).then(res=>{
        if(res.code) {
          this.$message.success('删除成功')
          this.getGoodsType_()
        }
      })
    }
  },
};
</script>
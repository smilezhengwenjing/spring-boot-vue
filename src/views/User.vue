<template>
  <div style="padding: 10px">
    <!--功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>
    <!--搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable></el-input>
      <el-button type="primary" style="margin-left: 5px;" @click="load">查询</el-button>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%"
        >
      <el-table-column
          prop="id"
          label="ID"
          sortable
          width="180">
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="nickName"
          label="昵称">
      </el-table-column>
      <el-table-column
          prop="age"
          label="年龄">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址">
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button
                  size="mini"
                  type="danger"
                 >删除
              </el-button>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 10px;text-align: center;">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10,20]"
          :page-size="pageSize"
          layout="total,sizes,prev,pager,next,jumper"
          :total="total">
      </el-pagination>

      <el-dialog
          title="提示"
          v-model="dialogVisible"
          width="30%"
      >
        <el-form label-width="120px">
          <el-form-item :modal="form" label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item :modal="form" label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item :modal="form" label="昵称">
            <el-input v-model="form.nickName"></el-input>
          </el-form-item>
          <el-form-item :modal="form" label="年龄">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.sex" label="男">男</el-radio>
            <el-radio v-model="form.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item :modal="form" label="地址">
            <el-input type="textarea" v-model="form.address"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
  </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import request from '@/utils/request.js'

export default {
  name: 'User',
  components: {},
  data() {
    return {
      form: {},
      dialogVisible: false,
      search: "",
      total: 10,
      currentPage: 1,
      pageSize: 10,
      tableData: []
    }
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      request.get("/user", {
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        }
      }).then((res) => {
        this.tableData = res.data.records;
        this.total = res.data.total;

      })
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogVisible = true;
    },
    handleDelete(id) {
      request.delete("/user/"+id).then(res=>{
        if(res.code=="0"){
          this.$message({
            type:"success",
            message:"删除成功！"
          });
          this.load();  //重新加载表格数据
        }else{
          this.$message({
            type:"erroe",
            message:data.msg
          })
        }
      });
    },
    add() {
      this.dialogVisible = true;
      this.form = {};
    },
    save() {
      if (this.form.id) {
        this.dialogVisible = false;
        request.put("/user", this.form).then((res) => {
          console.log(res);
          if (res.code == "0") {
            this.$message({
              type: "success",
              message: "更新成功"
            });
            this.load();
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
        });
      } else {
        request.post("/user", this.form).then((res) => {
          console.log(res);
          this.dialogVisible = false;
          if (res.code == "0") {
            this.$message({
              type: "success",
              message: "新增成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
            this.load();
          }
        });
      }
    },
    //改变当前每页的个数触发
    handleSizeChange(pageSize){
      this.pageSize = pageSize;
      this.load();
    },
    //改变当前页码触发
    handleCurrentChange(pageNum){
      this.currentPage = pageNum;
      this.load();
    }
  }
}
</script>

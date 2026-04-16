# guji-editor

基于 `HTML5 + JavaScript` 实现的古籍在线编辑器，按作业说明完成了以下核心能力：

- 按页加载古籍图片，支持样例页和本地图片导入
- 在线框选字、句、段三种标注
- 支持颜色标记、画框、划线三种整理方式
- 右侧属性栏可录入原文、简体、注释、编码、位置等信息
- 提供造字页面，可为无简体对应字分配 Unicode 私用区编码并关联字样图片
- 按给定 XML 结构导出 `article / head / content / view / sources`
- 支持项目 JSON 导入导出，方便继续编辑

## 使用方式

直接打开根目录下的 `index.html` 即可使用。

如果浏览器限制本地文件访问，建议在项目根目录启动一个静态服务器，例如：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000/index.html`。

## 百度 OCR 接入

项目已经内置本地 OCR 代理，前端会请求同源接口 `/api/ocr/page`，避免把百度云密钥暴露到浏览器里。

启动前先在 PowerShell 里设置环境变量：

```powershell
$env:BAIDU_OCR_API_KEY = "your-api-key"
$env:BAIDU_OCR_SECRET_KEY = "your-secret-key"
.\scripts\serve-local.ps1 -Port 8000
```

进入编辑页后，点击工具栏里的“当前页 OCR”即可把识别结果自动写入当前页标注。

如果你直接双击 `start-local-server.bat`，脚本也会在缺少密钥时提示输入；或者你可以复制 `start-local-server.env.example.bat` 为 `start-local-server.env.bat` 后填写密钥。

## 主要文件

- `index.html`：页面结构
- `styles.css`：界面样式
- `app.js`：标注、造字、状态保存与 XML 导出逻辑
- `古籍示例/`：作业提供的样例图片素材

検証済みの方法：
1. LibreOffice コマンドライン変換
	- NodeJS / Python
	- Layer を介して実装：
		- ファイルが大きすぎて Layer を作成できない
	- サブプロセスで `soffice` コマンドを呼び出して変換
		- 1024MB のメモリと 3 分のタイムアウトを設定しても、実行がタイムアウトする
2. Puppeteer と Headless Chrome
	- Node.js
	- Python で Excel を HTML に変換し、Node.js と Headless Chrome で PDF にレンダリング。HTML のスタイルと構造を完全に保持して PDF に変換可能。
	- Excel から HTML への変換と HTML から PDF への変換を 2 つの Lambda 関数に分けて実行する必要がある
3. Pandas + xhtml2pdf
	- Python
	- Pandas でデータを抽出し、xhtml2pdf で PDF に変換
	- Python に適している。実装可能だが、構造を一致させることができない。
4. Openpyxl + ReportLab
	- Python
	- Excel XML を手動で解析し、ReportLab で PDF を生成
	- Python に適している。実装可能だが、構造を一致させることができない。
5. Openpyxl / Pandas + WeasyPrint
	- Python
	- Excel XML を手動で解析し、WeasyPrint で PDF を生成
	- 検証に成功せず。WeasyPrint の依存関係が複雑で、Layer を介して依存関係パッケージを正しくインポートできない。
	- ECR でイメージを構築する方法は未検証。

その他の未検証の方法：
1. DioDocs：.NET Core ベースの C# ライブラリ（有料）
2. Syncfusion XlsIO（有料、.NET 環境のみ）
3. ECR で LibreOffice をデプロイ
4. docx-wasm
5. ExcelJS + pdf-lib

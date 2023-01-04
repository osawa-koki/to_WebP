import Layout from "../components/Layout";

export default function HelloWorld() {
  return (
    <Layout>
      <main>
        <div id="About">
          <h1>Here, About page.</h1>
          <p>2022年に新しく公開されたGitHub codespacesを使用してみました。<br /><br />とっても便利ですが、少し動作が不安定なように感じます。 <br />すぐに解消されるでしょうけど、、、<br /><br />Google ColabやGitHub workspacesなどの登場で、もはやプライベートPCのスペックが不要になりましたね、、、<br />もっともクラウドへ接続するためにある程度のスペックは求められますが、、、<br /><br />さえ、本題ですが、このサイトは画像ファイルをGoogleが開発した次世代画像フォーマットであるWebP形式に変換します。</p>
        </div>
      </main>
    </Layout>
  );
};

window.addEventListener("load", function () {
  // HTML要素の読み込みが終わったら発動

  document.addEventListener("click", function (e) {
    // 画面に対してclickイベントをセットする

    if (e.target.className == "post") {
      // clickした要素がpostクラスの要素だったら実行する
      clickPost(e.target)
    }
  });

});

function clickPost(post) {
  // どの投稿をクリックしたのか、カスタムデータを利用して取得している
  const postId = post.getAttribute("data-id");

  // Ajaxに必要なオブジェクトを生成している
  const XHR = new XMLHttpRequest();

  // openでリクエストを初期化する
  XHR.open("GET", `/posts/${postId}`, true);

  // レスポンスのタイプを指定する
  XHR.responseType = "json";

  // sendでリクエストを送信する
  XHR.send();

  // レスポンスを受け取った時の処理を記述する
  XHR.onload = () => {
    console.log(XHR.status);

    if (XHR.status != 200) {
      // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
      alert(`Error ${XHR.status}: ${XHR.statusText}`); // e.g. 404: Not Found
      return null;
    }

    const item = XHR.response.post;
    if (item.checked === true) {
      // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
      post.setAttribute("data-check", "true");
    } else if (item.checked === false) {
      // 未読状態であれば、カスタムデータを削除している
      post.removeAttribute("data-check");
    }

  };
  // リクエストが送信できなかった時
  XHR.onerror = function () {
    alert("Request failed");
  };
}

function Post(props) {
  return (
    <div className="Post">
      <p>
        {props.postData.title}
      </p>
      <p>
        {props.postData.body}
      </p>
    </div>
  );
}

export default Post;

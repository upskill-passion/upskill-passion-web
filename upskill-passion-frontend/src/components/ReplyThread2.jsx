export default function ReplyThread2({ replies }) {
  return (
    <div>
      <div>
        {replies.map((key, index) => {
          return (
            <div key={key.id}>
              <div
                style={{
                  backgroundColor: "white",
                  padding: "5px",
                  borderRadius: "100px",
                  paddingLeft: "25px",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    marginTop: "10px",
                    fontWeight: "bolder",
                  }}
                >
                  {key.posted_by}
                </p>
                <p style={{ fontSize: "14px" }}>{key.reply}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

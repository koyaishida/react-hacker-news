import { Dispatch } from "redux";
import { auth, FirebaseTimestamp, db } from "../../firebase/index";
import { push } from "connected-react-router";
import { signInAction, Actions, signOutAction } from "./actions";

const userRef = db.collection("user");

export const signUp = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return async (dispatch: Dispatch) => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です。");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試し下さい");
      return false;
    }

    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;

    if (user) {
      const uid = user.uid;
      const timestamp = FirebaseTimestamp.now();

      const userInitialData = {
        created_at: timestamp,
        email: email,
        uid: uid,
        username: username,
        bookmark: [],
      };

      userRef
        .doc(uid)
        .set(userInitialData)
        .then(async () => {
          console.log("created");
          dispatch(push("/"));
        })
        .catch((e) => {
          console.log(userInitialData);
          console.log(e);
        });
    }
  };
};

export const signIn = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    if (email === "" || password === "") {
      alert("必須項目が未入力です。");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;
        console.log(uid, "uid");

        userRef
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            if (data === undefined) {
              return null;
            }
            console.log(data);

            dispatch(
              signInAction({
                isSignedIn: true,
                uid: uid,
                username: data.username,
                email: email,
                bookmark: data.bookmark,
              })
            );
            dispatch(push("/"));
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };
};

export const listenAuthState = () => {
  return async (dispatch: Dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        userRef
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            if (data === undefined) {
              return null;
            }

            dispatch(
              signInAction({
                isSignedIn: true,
                uid: uid,
                username: data.username,
                email: data.email,
                bookmark: data.bookmark,
              })
            );
          });
        console.log("ログインずみ");
      } else {
        console.log("弾かれた");
        dispatch(push("/signIn"));
      }
    });
  };
};

export const signOut = () => {
  return async (dispatch: Dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/signIn"));
    });
  };
};

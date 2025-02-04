// import axios from "axios";
// export const resolvers = () => {
//   Query: {
//     async function getPainting() {
//       try {
//         const Painting = await axios.get("https://dummyjson.com/posts");
//         return Painting;
//       } catch (error) {
//         console.log("Error Occured", error);
//       }
//     }
//   }
// };
import axios from "axios";

export const resolvers = {
  Query: {
    async getPaintings() {
      try {
        const response = await axios.get("https://dummyjson.com/posts");
        return response.data.posts.map((post) => ({
          id: post.id,
          title: post.title,
          views: post.views,
          body: post.body,
        }));
      } catch (error) {
        console.error("Error occurred while fetching paintings:", error);
        throw new Error("Failed to fetch paintings.");
      }
    },
    async getTitleView() {
      try {
        const response = await axios.get("https://dummyjson.com/posts");
        console.log(response.data.pos);

        return response.data.posts.map((TitleViews) => ({
          title: TitleViews.title,
          views: TitleViews.views,
        }));
      } catch (error) {
        console.log(error);
      }
    },
    async getSpecificPainting(_, args) {
      try {
        const response = await axios.get("https://dummyjson.com/posts");
        const specific = response.data.posts.find(
          (post) => post.id === parseInt(args.id)
        );
        return {
          id: specific.id,
          title: specific.title,
          views: specific.views,
          body: specific.body,
        };
      } catch (error) {
        return new Error(error);
      }
    },
  },
};

import {Container, Avatar, Paper, Button} from "@mui/material";
import Page from "../components/Page";
import {deepPurple} from "@mui/material/colors";
import PRODUCTS from "../_mock/products";
import {ProductList} from "../sections/@dashboard/products";
import {useSelector} from "react-redux";
import utils from "../utils";

function Profile() {
  const {user} = useSelector(state => state.user)

  return (
    <Page title="Profile">
      <Container>
        <div className="w-full">
          <Paper
            alt={'background'}
            className="h-[300px] w-full rounded-xl -mb-[40px]"
            style={{
              backgroundImage: `url(${user?.background})`,
              backgroundSize: 'cover',
            }}
          />
          <div className="bg-white shadow-lg mx-[30px] z-10 rounded-xl p-4 flex flex-col">
            <div className="flex items-center mb-8">
              {user?.avatar ?
                <Avatar sx={{height: '70px', width: '70px'}} src={user.avatar}/>
                : <Avatar sx={{bgcolor: deepPurple[500], height: '70px', width: '70px'}}>OP</Avatar>}
              <div className="flex flex-col ml-6 flex-1">
                <div className="text-2xl font-bold">Dieptv</div>
                <div>Developer</div>
              </div>
              <div>
                <Button variant={'contained'}  onClick={utils.logout}>
                  Logout
                </Button>
              </div>
            </div>
            <ProductList products={PRODUCTS}/>
          </div>
        </div>
      </Container>
    </Page>
  )
}

export default Profile

const Signin = {
    after_render: () => {},
    render: () => {
        return `
        <div class="w-full h-[78vh] flex justify-center items-center">
        <div class="form w-[40%] flex justify-center items-center">
        <form id="signin-form" class="bg-white p-3 border-zinc-400 rounded border w-1/2">
        <h1  class="text-3xl font-semibold mb-3">Sign in </h1>
        <label for="email" class="text-2xl font-medium  my-2 block">Email</label>
        <input type="email" name="email" id="email" class="border border-black block w-full rounded py-2 px-2 focus:outline-none focus:border-2 transition-all duration-75"/>
        <label for="password" class="text-2xl font-medium  my-2 block">Password</label>
        <input type="password" name="password" id="password" class="border border-black block w-full rounded py-2 px-2 focus:outline-none focus:border-2 transition-all duration-75"/>
        <button type="submit" class="submit-btn bg-blue-500 block  text-center w-full my-4 py-1 text-2xl rounded text-white hover:bg-blue-600 transition-colors duration-75" >Sign in</button>
        <a href='/#/register' class="text-zinc-800 text-lg">Create an Account</a>
        </form>
        </div>
        </div>
        `
    }
}
export default Signin
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import logoSvg from "../assets/Path_logo.svg";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import DefaultInput from "../components/inputs/default/DefaultInput";

import { FaBehance } from "react-icons/fa6";

import { RxCross2 } from "react-icons/rx";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { TfiReload } from "react-icons/tfi";
import Select from "../components/select/Select";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

const Admin = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [allUsers, setAllUsers] = useState([]);
  const [allAdmins, setAllAdmins] = useState([]);
  const [showadmin, setShowadmin] = useState(false);

  const [search, SetSearch] = useState("");
  const [searchWith, setSearchWith] = useState("full_name");

  // <------ SWR fetch redirect ------>
  const fetcherRole = (...args) =>
    fetch(...args).then(async (res) => {
      const data = await res.json();
      if (data.data.role === "admin" || data.data.role === "manager") {
        setShowadmin(true);
      } else {
        navigate("/register-redirect");
      }
      return data;
    });
  useSWR(
    `${import.meta.env.VITE_BACKEND_URL}/get-user-by-id/${id}`,
    fetcherRole,
    {
      refreshInterval: 100,
    }
  );
  // <------- SWR fetch admin ------->
  const fetcherAdmin = (...args) =>
    fetch(...args).then(async (res) => {
      const data = await res.json();
      setAllAdmins(data.data);

      return data;
    });
  // <------- SWR fetch user ------->
  const fetcherUser = (...args) =>
    fetch(...args).then(async (res) => {
      const data = await res.json();
      setAllUsers(data.data);

      return data;
    });

  useSWR(`${import.meta.env.VITE_BACKEND_URL}/get-all-users`, fetcherUser, {
    refreshInterval: 1000,
  });
  useSWR(`${import.meta.env.VITE_BACKEND_URL}/get-all-admins`, fetcherAdmin, {
    refreshInterval: 1000,
  });

  return (
    showadmin && (
      <div>
        <SignedIn>
          <div className="flex-col mx-auto mt-8">
            <div className="ml-5 flex justify-between mb-4">
              <img className="" width={"124px"} src={logoSvg} alt="logo" />
              <div className="flex  ml-5">
                {allAdmins.map((admin, index) => {
                  return (
                    <div className="mr-5 flex flex-col" key={index}>
                      <h3 className="text-center flex flex-col justify-center items-center text-base font-bold">
                        {admin.full_name}
                        {admin.admin_state === 0 ? (
                          <div className="rounded-full p-2 bg-busy w-2 mb-3"></div>
                        ) : (
                          <div className="rounded-full p-2 bg-available w-2 mb-3"></div>
                        )}
                      </h3>
                      <div className="flex justify-center">
                        <button
                          className="bg-green-500 text-white px-4 rounded-lg border-none py-1"
                          onClick={async () => {
                            const adminId = admin.id;
                            await axios.put("/set-admin-state-green", {
                              id: adminId,
                            });
                          }}
                        >
                          Start
                        </button>
                        <button
                          onClick={async () => {
                            const adminId = admin.id;
                            await axios.put("/set-admin-state-red", {
                              id: adminId,
                            });
                          }}
                          className="bg-red-500 text-white mx-1 px-4 rounded-lg border-none py-1"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-row items-end ml-5 mb-5">
              <UserButton afterSignOutUrl="/login" />
              <div>
                {searchWith !== "current_stand" && searchWith !== "path" ? (
                  <DefaultInput
                    className="ml-4 py-2 border-1 rounded-lg px-4"
                    onChange={(e) => SetSearch(e.target.value)}
                    placeholder={`Search by ${searchWith}`}
                  />
                ) : (
                  <>
                    <Select SetSearch={SetSearch} />
                  </>
                )}
              </div>
              <div className="mx-5 flex flex-row justify-around w-1/3">
                <button
                  className={
                    searchWith === "id"
                      ? "bg-white border-2 border-logocolor text-logocolor px-2 py-1 rounded-md mt-3"
                      : "text-white bg-logocolor px-2 py-1 rounded-md mt-3"
                  }
                  onClick={() => {
                    setSearchWith("id");
                  }}
                >
                  By Id
                </button>
                <button
                  className={
                    searchWith === "full_name"
                      ? "bg-white border-2 border-logocolor text-logocolor px-2 py-1 rounded-md mt-3"
                      : "text-white bg-logocolor px-2 py-1 rounded-md mt-3"
                  }
                  onClick={() => {
                    setSearchWith("full_name");
                  }}
                >
                  By Name
                </button>
                <button
                  className={
                    searchWith === "email"
                      ? "bg-white border-2 border-logocolor text-logocolor px-2 py-1 rounded-md mt-3"
                      : "text-white bg-logocolor px-2 py-1 rounded-md mt-3"
                  }
                  onClick={() => {
                    setSearchWith("email");
                  }}
                >
                  By Email
                </button>
                <button
                  className={
                    searchWith === "path"
                      ? "bg-white border-2 border-logocolor text-logocolor px-2 py-1 rounded-md mt-3"
                      : "text-white bg-logocolor px-2 py-1 rounded-md mt-3"
                  }
                  onClick={() => {
                    setSearchWith("path");
                  }}
                >
                  By Path
                </button>
                <button
                  className={
                    searchWith === "current_stand"
                      ? "bg-white border-2 border-logocolor text-logocolor px-2 py-1 rounded-md mt-3"
                      : "text-white bg-logocolor px-2 py-1 rounded-md mt-3"
                  }
                  onClick={() => {
                    setSearchWith("current_stand");
                  }}
                >
                  By Current Stand
                </button>
              </div>
            </div>
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-100 text-gay-600">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Full Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Path </th>
                  <th className="px-4 py-2">Behance</th>
                  <th className="px-4 py-2">Current Stand</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUsers
                  .filter((item) => {
                    return search.toLowerCase() === ""
                      ? item
                      : searchWith === "full_name"
                      ? item.full_name
                          .toLowerCase()
                          .startsWith(search.toLowerCase())
                      : searchWith === "id"
                      ? item.id
                          .toString()
                          .toLowerCase()
                          .startsWith(search.toLowerCase())
                      : searchWith === "email"
                      ? item.email
                          .toLowerCase()
                          .startsWith(search.toLowerCase())
                      : searchWith === "current_stand"
                      ? item.current_topic
                          .toString()
                          .toLowerCase()
                          .startsWith(search.toLowerCase())
                      : searchWith === "path"
                      ? item.path.toLowerCase().startsWith(search.toLowerCase())
                      : "";
                  })
                  .map((user, i) => (
                    <tr
                      key={i}
                      className=" odd:bg-gray-200 even:bg-white text-gray-600 text-center"
                    >
                      <td className="px-4 py-2">{user.id}</td>
                      <td className="px-4 py-2">{user.full_name} </td>
                      <td className="px-4 py-2">{user.email} </td>
                      <td className="px-4 py-2">{user.path} </td>
                      <td className="px-4 py-2">
                        {
                          <a
                            title={user.behanceLink}
                            target="_blank"
                            href={user.behanceLink}
                          >
                            {user.behanceLink ? (
                              <FaBehance className="mx-auto text-gray-700" />
                            ) : (
                              <RxCross2 className="mx-auto text-gray-700" />
                            )}
                          </a>
                        }
                      </td>
                      <td className="px-4 py-2">{user.current_topic}</td>
                      <td className="px-4 py-2 flex space-x-1 items-center">
                        <div className=" mr-5">
                          <button
                            onClick={async () => {
                              const id = user.id;
                              await axios.put("update-user-to-manager", {
                                id,
                              });
                            }}
                            className="mr-2 px-2 py-1 text-xs font-bold rounded-md  text-gray-900 border-solid border-1 border-gray-800 hover:opacity-70"
                          >
                            Set Manager
                          </button>
                          <button
                            onClick={async () => {
                              const id = user.id;
                              await axios.delete("/delete", { data: { id } });
                            }}
                            className="mr-2 px-2 py-1 border-none text-xs font-bold rounded-md bg-red-500 text-white hover:opacity-70"
                          >
                            Delete User
                          </button>
                          <button
                            onClick={async () => {
                              const id = user.id;
                              await axios.put("update-user-to-admin", {
                                id,
                              });
                            }}
                            className="px-2 py-1 text-xs font-bold rounded-md  text-gray-900 border-solid border-1 border-gray-800 hover:opacity-70"
                          >
                            Set Admin
                          </button>
                        </div>
                        <div className="ml-5 flex flex-row justify-center items-center">
                          <button
                            onClick={async () => {
                              const { id, path, current_stand } = user;

                              await axios.put("/prev-stand", {
                                id,
                                path,
                                current_stand,
                              });
                            }}
                            className="bg-available border-none text-white font-bold rounded hover:bg-available hover:opacity-75 py-1 px-3 mr-1"
                          >
                            <p className="flex flex-row items-center">
                              <GrLinkPrevious className="mr-2" /> Prev stand
                            </p>
                          </button>
                          <button
                            onClick={async () => {
                              const { id } = user;

                              await axios.put("/reset-path", {
                                id,
                              });
                            }}
                            className="text-gray-900 border-solid border-1 border-gray-800 font-bold rounded hover:opacity-75  py-1 px-3 mr-1 ml-1"
                          >
                            <p className="flex flex-row items-center">
                              Reset path <TfiReload className="ml-2" />
                            </p>
                          </button>
                          <button
                            onClick={async () => {
                              const { id, path, current_stand } = user;

                              await axios.put("/next-stand", {
                                id,
                                path,
                                current_stand,
                              });
                            }}
                            className="bg-available border-none  text-white font-bold rounded hover:bg-available hover:opacity-75  py-1 px-3 ml-1"
                          >
                            <p className="flex flex-row items-center">
                              Next stand <GrLinkNext className="ml-2" />
                            </p>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </SignedIn>
        <SignedOut className="">
          <SignInButton className="px-4 py-1 m-4 rounded-lg border-none bg-blue-300 cursor-pointer ">
            Login
          </SignInButton>
        </SignedOut>
      </div>
    )
  );
};

export default Admin;

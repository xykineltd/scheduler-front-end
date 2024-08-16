import React from "react";

function NoMatch() {
  return (
    <>
      <div className="flex min-h-full flex-col">

        <main className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
          <p className="text-xl font-semibold leading-8 text-xykine-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-xykine-primary sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-lg leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10">
            <a href="/"  className="text-lg font-semibold leading-7 text-xykine-primary">
              <span aria-hidden="true">&larr;</span> Back to home
            </a>
          </div>
        </main>
      </div>
    </>
  )
  }

  export default NoMatch
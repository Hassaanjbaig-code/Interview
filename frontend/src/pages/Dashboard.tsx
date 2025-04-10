const Dashboard = () => {
  return (
    <div className="flex-1 p-6 h-screen">
      <div className="rounded-md p-6">
        <h1 className="font-bold text-3xl mb-8">Dashboard</h1>
        <p className="leading-normal mb-8">
          Hey there! Welcome to Ping CRM, a demo app designed to help illustrate how{' '}
          <a
            href="https://inertiajs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2f365f] hover:text-orange-600 font-bold underline"
          >
            Inertia.js
          </a>{' '}
          works with{' '}
          <a
            href="https://rubyonrails.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2f365f] hover:text-orange-600 font-bold underline"
          >
            Ruby on Rails
          </a>
          .
        </p>
        <p className="text-sm leading-normal mb-8">Version 4a4abad - 10 hours ago</p>
      </div>
    </div>
  );
};

export default Dashboard;
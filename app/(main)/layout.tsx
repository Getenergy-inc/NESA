import ConditionalLayout from "@/components/Layout/ConditionalLayout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConditionalLayout>
      {children}
    </ConditionalLayout>
  );
};

export default Layout;

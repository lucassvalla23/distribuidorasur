import React from "react";
import { Input, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useProducts } from "../contexts/product-context";
import { Product } from "../types";
import { Link } from "react-router-dom";

const SearchBar: React.FC = () => {
  const { searchProducts } = useProducts();
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Product[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  const handleSearch = (value: string) => {
    setQuery(value);
    
    if (value.trim().length >= 2) {
      setResults(searchProducts(value));
      setIsSearching(true);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsSearching(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-xs" ref={searchRef}>
      <Input
        placeholder="Buscar productos..."
        value={query}
        onValueChange={handleSearch}
        startContent={<Icon icon="lucide:search" className="text-default-400" />}
        endContent={
          query && (
            <button onClick={clearSearch}>
              <Icon icon="lucide:x" className="text-default-400 cursor-pointer" />
            </button>
          )
        }
        color="primary"
        variant="bordered"
        className="w-full"
      />
      
      {isSearching && (
        <Card className="absolute z-50 w-full mt-1 p-2 search-results">
          {results.length === 0 ? (
            <div className="p-2 text-center text-default-500">
              No se encontraron productos
            </div>
          ) : (
            <ul>
              {results.map((product) => (
                <li key={product.id} className="border-b border-default-100 last:border-none">
                  <Link
                    to={`/?product=${product.id}`}
                    className="flex items-center gap-2 p-2 hover:bg-default-100 rounded-medium"
                    onClick={clearSearch}
                  >
                    <div className="w-10 h-10 bg-[#2d2e2e] rounded-small flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-1 rounded-small"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-default-500">{product.category} - {product.subcategory}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
};

export default SearchBar;